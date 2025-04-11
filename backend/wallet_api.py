from web3 import Web3
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
assert w3.is_connected(), "Cannot connect to blockchain"

# Load contract (compile and migrate first)
with open("../blockchain/build/contracts/SimpleWallet.json") as f:
    contract_json = json.load(f)
contract_abi = contract_json["abi"]
contract_address = "0x4d87Ad6850Ab1f70a04fb3aBF26E1564E98d4e56"  # Update after migration
wallet_contract = w3.eth.contract(address=contract_address, abi=contract_abi)

wallet_ids = {}  # Mock user mapping

@app.route('/wallet/create', methods=['POST'])
def create_wallet():
    username = request.json.get('username')
    if not username:
        return jsonify({'error': 'Username required'}), 400
    account = w3.eth.accounts[0]  # First Ganache account
    wallet_ids[account] = username
    balance = wallet_contract.functions.getBalance(account).call()
    return jsonify({'wallet_id': account, 'balance': w3.from_wei(balance, 'ether')})

@app.route('/wallet/<wallet_id>/balance', methods=['GET'])
def get_balance(wallet_id):
    try:
        balance = wallet_contract.functions.getBalance(Web3.to_checksum_address(wallet_id)).call()
        return jsonify({'balance': w3.from_wei(balance, 'ether')})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/wallet/<wallet_id>/transfer', methods=['POST'])
def transfer_funds(wallet_id):
    data = request.json
    to_address = data.get('to')
    amount = float(data.get('amount', 0))
    if not to_address or amount <= 0:
        return jsonify({'error': 'Invalid to_address or amount'}), 400
    try:
        sender = Web3.to_checksum_address(wallet_id)
        tx = wallet_contract.functions.transfer(Web3.to_checksum_address(to_address), w3.to_wei(amount, 'ether')).transact({'from': sender})
        w3.eth.wait_for_transaction_receipt(tx)
        new_balance = wallet_contract.functions.getBalance(sender).call()
        return jsonify({
            'new_balance': w3.from_wei(new_balance, 'ether'),
            'txn': {'id': tx.hex(), 'type': 'send', 'amount': amount, 'to': to_address}
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/wallet/<wallet_id>/earn', methods=['POST'])
def earn_coins(wallet_id):
    amount = float(request.json.get('amount', 10))
    if amount <= 0:
        return jsonify({'error': 'Invalid amount'}), 400
    try:
        owner = wallet_contract.functions.getOwner().call()
        tx = wallet_contract.functions.earnCoins(Web3.to_checksum_address(wallet_id), w3.to_wei(amount, 'ether')).transact({'from': owner})
        w3.eth.wait_for_transaction_receipt(tx)
        new_balance = wallet_contract.functions.getBalance(Web3.to_checksum_address(wallet_id)).call()
        return jsonify({
            'new_balance': w3.from_wei(new_balance, 'ether'),
            'txn': {'id': tx.hex(), 'type': 'receive', 'amount': amount}
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/wallet/<wallet_id>/transactions', methods=['GET'])
def get_transactions(wallet_id):
    try:
        address = Web3.to_checksum_address(wallet_id)
        events = wallet_contract.events.Transfer().get_logs(fromBlock=0, toBlock='latest')
        transactions = []
        for event in events:
            if event['args']['from'].lower() == address.lower():
                transactions.append({
                    'id': event['transactionHash'].hex(),
                    'type': 'send',
                    'amount': w3.from_wei(event['args']['value'], 'ether'),
                    'to': event['args']['to']
                })
            elif event['args']['to'].lower() == address.lower():
                transactions.append({
                    'id': event['transactionHash'].hex(),
                    'type': 'receive',
                    'amount': w3.from_wei(event['args']['value'], 'ether'),
                    'from': event['args']['from']
                })
        return jsonify(transactions)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)