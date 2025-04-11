from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
import uuid, time, json, logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables.")
logger.debug(f"GEMINI_API_KEY loaded: {'Yes' if api_key else 'No'}")

# Configure Gemini API
try:
    genai.configure(api_key=api_key)
    logger.debug("Gemini API configured successfully")
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {str(e)}")
    raise

# Initialize Gemini model
try:
    model = genai.GenerativeModel('gemini-1.5-flash')
    logger.debug("Gemini model initialized")
except Exception as e:
    logger.error(f"Failed to initialize Gemini model: {str(e)}")
    raise

# In-memory wallets
wallets = {}

# Wallet Routes
@app.route('/wallet/create', methods=['POST'])
def create_wallet():
    username = request.json['username']
    wallet_id = str(uuid.uuid4())
    wallets[wallet_id] = {
        'username': username,
        'balance': 100.0,  # Starting fake balance
        'transactions': []
    }
    return jsonify({'wallet_id': wallet_id, 'balance': 100.0})

@app.route('/wallet/<wallet_id>/balance')
def get_balance(wallet_id):
    wallet = wallets.get(wallet_id)
    if wallet:
        return jsonify({'balance': wallet['balance']})
    return jsonify({'error': 'Wallet not found'}), 404

@app.route('/wallet/<wallet_id>/transfer', methods=['POST'])
def transfer(wallet_id):
    wallet = wallets.get(wallet_id)
    if not wallet:
        return jsonify({'error': 'Wallet not found'}), 404

    data = request.json
    amount = data['amount']
    if wallet['balance'] >= amount:
        wallet['balance'] -= amount
        txn = {
            'id': str(uuid.uuid4())[:8],
            'type': 'debit',
            'amount': amount,
            'timestamp': int(time.time())
        }
        wallet['transactions'].append(txn)
        return jsonify({'message': 'Transfer successful', 'new_balance': wallet['balance'], 'txn': txn})
    return jsonify({'error': 'Insufficient balance'}), 400

@app.route('/wallet/<wallet_id>/transactions')
def get_transactions(wallet_id):
    wallet = wallets.get(wallet_id)
    if wallet:
        return jsonify(wallet['transactions'])
    return jsonify({'error': 'Wallet not found'}), 404

# AI Analysis Routes
@app.route('/api/analyze', methods=['POST'])
def analyze_gameplay():
    try:
        # Get query from frontend
        data = request.get_json()
        logger.debug(f"Received data: {data}")
        query = data.get('query', '')

        if not query:
            logger.warning("No query provided in request")
            return jsonify({'error': 'No query provided'}), 400

        prompt = f"""
        You are a gaming analysis AI. Provide concise gaming advice based on the following player query.
        Return your response as simple text, with each suggestion separated by a newline.
        Keep each suggestion under 180 words and categorize it as a strategy, improvement, or insight.
        Example format:
        Strategy: Use cover effectively to avoid enemy fire.
        Improvement: Practice aim in training mode daily.
        Insight: Most players peak in evening hours.
        Query: {query}
        """
        logger.debug(f"Prompt constructed: {prompt[:100]}...")

        # Generate response from Gemini
        response = model.generate_content(prompt)
        logger.debug(f"Raw Gemini response: {response.text if response and hasattr(response, 'text') else 'No response text'}")

        # Parse the response as simple text and convert to JSON
        if response and hasattr(response, 'text'):
            lines = response.text.strip().split('\n')
            suggestions = []
            for i, line in enumerate(lines, 1):
                line = line.strip()
                if line:
                    parts = line.split(': ', 1)
                    if len(parts) == 2 and parts[0].lower() in ["strategy", "improvement", "insight"]:
                        suggestion_type = parts[0].lower()
                        description = parts[1]
                    else:
                        suggestion_type = "insight"
                        description = line
                    suggestions.append({
                        "id": f"suggestion-{i}",
                        "title": description[:30] + "..." if len(description) > 30 else description,
                        "description": description,
                        "type": suggestion_type
                    })
            result = {"suggestions": suggestions if suggestions else [{
                "id": "1",
                "title": "Analysis Result",
                "description": response.text.strip(),
                "type": "insight"
            }]}
        else:
            logger.error("No valid response from Gemini")
            result = {
                "suggestions": [{
                    "id": "1",
                    "title": "Analysis Failed",
                    "description": "No response received from the AI model.",
                    "type": "insight"
                }]
            }

        logger.debug(f"Final response to frontend: {result}")
        return jsonify(result), 200

    except Exception as e:
        logger.error(f"Error in analyze_gameplay: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)