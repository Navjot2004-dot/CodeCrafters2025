// import React, { useState } from "react";
// import { BrainCircuit, SearchCheck, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { useToast } from "@/hooks/use-toast";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// type Suggestion = {
//   id: string;
//   title: string;
//   description: string;
//   type: "strategy" | "improvement" | "insight";
// };

// const AIAnalyse = () => {
//   const [query, setQuery] = useState<string>("");
//   const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!query.trim()) {
//       toast({
//         title: "Empty query",
//         description: "Please enter something to analyze",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsAnalyzing(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/analyze', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       if (!Array.isArray(data.suggestions)) {
//         throw new Error("Invalid suggestions format from API");
//       }

//       setSuggestions(data.suggestions);
//       toast({
//         title: "Analysis complete",
//         description: "New suggestions have been generated based on your query",
//       });
//     } catch (error) {
//       console.error("Error fetching analysis:", error);
//       toast({
//         title: "Error",
//         description: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
//         variant: "destructive",
//       });
//       setSuggestions([{
//         id: "error-1",
//         title: "Analysis Error",
//         description: `Failed to get suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`,
//         type: "insight"
//       }]);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const getCardStyle = (type: Suggestion["type"]) => {
//     switch (type) {
//       case "strategy":
//         return "border-neon-blue/30 bg-neon-blue/5";
//       case "improvement":
//         return "border-neon-purple/30 bg-neon-purple/5";
//       case "insight":
//         return "border-neon-cyan/30 bg-neon-cyan/5";
//       default:
//         return "border-gray-500/30 bg-gray-500/5";
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-black text-white">
//       <Navbar />
      
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <Avatar className="h-16 w-16 border-2 border-neon-blue">
//               <AvatarFallback className="bg-neon-blue/10">A</AvatarFallback>
//             </Avatar>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold">AI Gaming Suggestions</h1>
//               <p className="text-gray-400">Unlock personalized tips to level up your game</p>
//             </div>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <Button className="btn-neon" onClick={handleSubmit} disabled={isAnalyzing}>
//               {isAnalyzing ? "Analyzing..." : "Suggest Now"}
//               {isAnalyzing ? <SearchCheck className="ml-2 h-5 w-5 animate-pulse" /> : <Send className="ml-2 h-5 w-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Input Card */}
//         <Card className="glass-panel mb-8">
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold flex items-center">
//               <BrainCircuit className="mr-2 h-5 w-5 text-neon-blue" />
//               Ask for Gaming Advice
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <Textarea
//                 placeholder="e.g., How can I improve my K/D ratio? What weapons should I use for map X?"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="w-full min-h-[100px] border border-white/30 bg-black/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-purple"
//               />
//             </form>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <Card className="glass-panel">
//             <CardContent className="p-6 flex flex-col items-center text-center">
//               <BrainCircuit className="h-8 w-8 text-neon-blue mb-2" />
//               <p className="text-sm text-gray-400">Total Suggestions</p>
//               <p className="text-2xl font-bold">{suggestions.length}</p>
//             </CardContent>
//           </Card>
//           <Card className="glass-panel">
//             <CardContent className="p-6 flex flex-col items-center text-center">
//               <BrainCircuit className="h-8 w-8 text-neon-purple mb-2" />
//               <p className="text-sm text-gray-400">Active Queries</p>
//               <p className="text-2xl font-bold">1</p>
//             </CardContent>
//           </Card>
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* AI Suggestions */}
//           <div className="col-span-1 lg:col-span-2">
//             <Card className="glass-panel h-full">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle className="text-xl font-semibold flex items-center">
//                   <BrainCircuit className="mr-2 h-5 w-5 text-neon-blue" />
//                   Your AI-Powered Suggestions
//                 </CardTitle>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/20 transition-all"
//                   onClick={handleSubmit}
//                 >
//                   <BrainCircuit className="mr-2 h-4 w-4" /> Refresh Suggestions
//                 </Button>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {suggestions.length > 0 ? (
//                     suggestions.map((suggestion) => (
//                       <div
//                         key={suggestion.id}
//                         className={`p-3 rounded-lg border flex justify-between items-center ${getCardStyle(suggestion.type)}`}
//                       >
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2">
//                             <span className="font-medium text-white truncate">{suggestion.title}</span>
//                           </div>
//                           <p className="text-sm text-gray-400 mt-1 break-words">
//                             {suggestion.description}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white">
//                             {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
//                           </span>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-6">
//                       <BrainCircuit className="mx-auto h-12 w-12 text-neon-purple mb-4 opacity-50" />
//                       <p className="text-gray-400 text-lg">No suggestions yet. Submit a query to get started!</p>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
          
//           {/* Additional Info (Placeholder) */}
//           <div className="col-span-1 space-y-6">
//             <Card className="glass-panel">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle className="text-xl font-semibold flex items-center">
//                   <BrainCircuit className="mr-2 h-5 w-5 text-neon-purple" />
//                   Quick Tips
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="p-3 rounded-lg border border-white/10 bg-white/5">
//                     <p className="text-sm text-gray-400">
//                       Use specific game names (e.g., Valorant) for better advice.
//                     </p>
//                   </div>
//                   <div className="p-3 rounded-lg border border-white/10 bg-white/5">
//                     <p className="text-sm text-gray-400">
//                       Ask about strategies or mechanics for tailored suggestions.
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default AIAnalyse;

import React, { useState } from "react";
import { BrainCircuit, SearchCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card"; // Removed CardHeader
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Suggestion = {
  id: string;
  title: string;
  description: string;
  type: "strategy" | "improvement" | "insight";
};

const AIAnalyse = () => {
  const [query, setQuery] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Empty query",
        description: "Please enter something to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!Array.isArray(data.suggestions)) {
        throw new Error("Invalid suggestions format from API");
      }

      setSuggestions(data.suggestions);
      toast({
        title: "Analysis complete",
        description: "New suggestions have been generated based on your query",
      });
    } catch (error) {
      console.error("Error fetching analysis:", error);
      toast({
        title: "Error",
        description: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      setSuggestions([{
        id: "error-1",
        title: "Analysis Error",
        description: `Failed to get suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: "insight"
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getCardStyle = (type: Suggestion["type"]) => {
    switch (type) {
      case "strategy":
        return "border-neon-blue/30 bg-neon-blue/5";
      case "improvement":
        return "border-neon-purple/30 bg-neon-purple/5";
      case "insight":
        return "border-neon-cyan/30 bg-neon-cyan/5";
      default:
        return "border-gray-500/30 bg-gray-500/5";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-neon-blue">
              <AvatarFallback className="bg-neon-blue/10">A</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Gaming Suggestions</h1>
              <p className="text-gray-400">Unlock personalized tips to level up your game</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="btn-neon" onClick={handleSubmit} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : "Suggest Now"}
              {isAnalyzing ? <SearchCheck className="ml-2 h-5 w-5 animate-pulse" /> : <Send className="ml-2 h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Input Card */}
        <Card className="glass-panel mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="e.g., How can I improve my K/D ratio? What weapons should I use for map X?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full min-h-[150px] text-lg border border-white/30 bg-black/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-purple"
              />
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-panel">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BrainCircuit className="h-10 w-10 text-neon-blue mb-3" />
              <p className="text-base text-gray-400">Total Suggestions</p>
              <p className="text-3xl font-bold">{suggestions.length}</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BrainCircuit className="h-10 w-10 text-neon-purple mb-3" />
              <p className="text-base text-gray-400">Active Queries</p>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Suggestions */}
          <div className="col-span-1 lg:col-span-2">
            <Card className="glass-panel h-full">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {suggestions.length > 0 ? (
                    suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className={`p-4 rounded-lg border flex justify-between items-center ${getCardStyle(suggestion.type)}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-base text-gray-300 break-words">
                            {suggestion.description}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white">
                            {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BrainCircuit className="mx-auto h-16 w-16 text-neon-purple mb-4 opacity-50" />
                      <p className="text-gray-400 text-xl">No suggestions yet. Submit a query to get started!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Info */}
          <div className="col-span-1 space-y-6">
            <Card className="glass-panel">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                    <p className="text-base text-gray-300">
                      Use specific game names (e.g., Valorant) for better advice.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                    <p className="text-base text-gray-300">
                      Ask about strategies or mechanics for tailored suggestions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAnalyse;