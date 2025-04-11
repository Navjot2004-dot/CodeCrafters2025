// import { useState } from "react";
// import { Youtube, Video, X } from "lucide-react";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { useIsMobile } from "@/hooks/use-mobile";

// type TutorialVideo = {
//   id: string;
//   title: string;
//   description: string;
//   youtubeId: string;
// };

// const tutorialVideos: TutorialVideo[] = [
//   {
//     id: "getting-started",
//     title: "Getting Started Guide",
//     description: "Learn the basics of RankMatch and how to set up your profile.",
//     youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
//   },
//   {
//     id: "matchmaking",
//     title: "Matchmaking Tips & Tricks",
//     description: "Advanced strategies to find the perfect teammates.",
//     youtubeId: "xvFZjo5PgG0", // Replace with actual YouTube video ID
//   },
//   {
//     id: "tournaments",
//     title: "Tournament Strategy Guide",
//     description: "How to prepare and compete in RankMatch tournaments.",
//     youtubeId: "cE49gRWfXCeGjHK5", // Replace with actual YouTube video ID
//   },
// ];

// const TutorialButtons = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(null);
//   const isMobile = useIsMobile();

//   const handleOpenVideo = (video: TutorialVideo) => {
//     setSelectedVideo(video);
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Floating button container */}
//       <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
//         {/* Main tutorials button */}
//         <Drawer>
//           <DrawerTrigger asChild>
//             <Button 
//               size="icon" 
//               className="h-14 w-14 rounded-full shadow-lg bg-neon-purple hover:bg-neon-purple/80 text-white"
//             >
//               <Youtube className="h-6 w-6" />
//             </Button>
//           </DrawerTrigger>
//           <DrawerContent className="glass-panel border-none">
//             <DrawerHeader>
//               <DrawerTitle className="text-xl neon-text">Tutorial Videos</DrawerTitle>
//               <DrawerDescription>
//                 Watch these videos to get the most out of RankMatch
//               </DrawerDescription>
//             </DrawerHeader>
//             <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
//               {tutorialVideos.map((video) => (
//                 <div
//                   key={video.id}
//                   className="glass-panel rounded-lg p-4 cursor-pointer hover:border-neon-purple/50 transition-all"
//                   onClick={() => handleOpenVideo(video)}
//                 >
//                   <div className="aspect-video bg-black/50 rounded-md flex items-center justify-center mb-3 relative overflow-hidden group">
//                     <img 
//                       src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} 
//                       alt={video.title} 
//                       className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Video className="h-10 w-10 text-white opacity-70 group-hover:text-neon-purple group-hover:opacity-100 transition-all" />
//                     </div>
//                   </div>
//                   <h3 className="font-semibold text-white">{video.title}</h3>
//                   <p className="text-sm text-gray-300 mt-1">{video.description}</p>
//                 </div>
//               ))}
//             </div>
//             <DrawerFooter>
//               <DrawerClose asChild>
//                 <Button variant="outline">Close</Button>
//               </DrawerClose>
//             </DrawerFooter>
//           </DrawerContent>
//         </Drawer>
//       </div>

//       {/* Video modal */}
//       {selectedVideo && (
//         <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
//           <div className="relative w-full max-w-3xl">
//             <Button 
//               size="icon" 
//               variant="ghost" 
//               className="absolute -top-12 right-0 text-white hover:bg-white/10"
//               onClick={() => setSelectedVideo(null)}
//             >
//               <X className="h-6 w-6" />
//             </Button>
            
//             <div className="glass-panel rounded-lg overflow-hidden">
//               <div className="aspect-video w-full">
//                 <iframe
//                   src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
//                   title={selectedVideo.title}
//                   className="w-full h-full"
//                   allowFullScreen
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 ></iframe>
//               </div>
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold neon-text">{selectedVideo.title}</h2>
//                 <p className="text-gray-300 mt-1">{selectedVideo.description}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TutorialButtons;

// import { useState } from "react";
// import { Youtube, Video, X } from "lucide-react";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useIsMobile } from "@/hooks/use-mobile";

// type TutorialVideo = {
//   id: string;
//   title: string;
//   description: string;
//   youtubeId: string;
//   game: string;
// };

// const tutorialVideos: TutorialVideo[] = [
//   // League of Legends Tutorials
//   {
//     id: "lol-basics",
//     title: "LoL Basics",
//     description: "Master the fundamentals of League of Legends.",
//     youtubeId: "y0ERlouCWR4", // Replace with actual YouTube video ID
//     game: "League of Legends",
//   },
//   // Valorant Tutorials
//   {
//     id: "val-basics",
//     title: "Valorant Basics",
//     description: "Learn essential Valorant mechanics and strategies.",
//     youtubeId: "YOUR_VALORANT_VIDEO_ID_1", // Replace with actual YouTube video ID
//     game: "Valorant",
//   },
//   // Overwatch 2 Tutorials
//   {
//     id: "ow2-basics",
//     title: "Overwatch 2 Basics",
//     description: "Get started with Overwatch 2 heroes and gameplay.",
//     youtubeId: "YOUR_OW2_VIDEO_ID_1", // Replace with actual YouTube video ID
//     game: "Overwatch 2",
//   },
//   // Apex Legends Tutorials
//   {
//     id: "apex-basics",
//     title: "Apex Legends Basics",
//     description: "Master movement and combat in Apex Legends.",
//     youtubeId: "YOUR_APEX_VIDEO_ID_1", // Replace with actual YouTube video ID
//     game: "Apex Legends",
//   },
//   // Add more videos as needed...
// ];

// const TutorialButtons = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(null);
//   const [selectedGame, setSelectedGame] = useState<string>("All");
//   const isMobile = useIsMobile();

//   const handleOpenVideo = (video: TutorialVideo) => {
//     setSelectedVideo(video);
//     setIsOpen(false);
//   };

//   const filteredVideos = selectedGame === "All" 
//     ? tutorialVideos 
//     : tutorialVideos.filter(video => video.game === selectedGame);

//   return (
//     <>
//       {/* Floating button container */}
//       <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
//         <Drawer>
//           <DrawerTrigger asChild>
//             <Button 
//               size="icon" 
//               className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white transition-all duration-300"
//             >
//               <Youtube className="h-6 w-6" />
//             </Button>
//           </DrawerTrigger>
//           <DrawerContent className="glass-panel border-none max-h-[90vh] overflow-y-auto">
//             <DrawerHeader className="sticky top-0 bg-black/80 backdrop-blur-md z-10">
//               <DrawerTitle className="text-2xl neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
//                 Game Tutorials
//               </DrawerTitle>
//               <DrawerDescription className="text-gray-300">
//                 Select a game and master your skills
//               </DrawerDescription>
//             </DrawerHeader>

//             {/* Game Selection */}
//             <div className="px-4 pb-4">
//               <Select onValueChange={setSelectedGame} defaultValue="All">
//                 <SelectTrigger className="w-full max-w-xs mx-auto bg-black/50 border-neon-purple/30 text-white">
//                   <SelectValue placeholder="Select a game" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-black/95 border-neon-purple/30 text-white">
//                   <SelectItem value="All">All Games</SelectItem>
//                   <SelectItem value="League of Legends">League of Legends</SelectItem>
//                   <SelectItem value="Valorant">Valorant</SelectItem>
//                   <SelectItem value="Overwatch 2">Overwatch 2</SelectItem>
//                   <SelectItem value="Apex Legends">Apex Legends</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Video Grid */}
//             <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
//               {filteredVideos.map((video) => (
//                 <div
//                   key={video.id}
//                   className="glass-panel rounded-lg p-4 cursor-pointer hover:border-neon-purple/50 hover:shadow-neon transition-all duration-300"
//                   onClick={() => handleOpenVideo(video)}
//                 >
//                   <div className="aspect-video bg-black/50 rounded-md flex items-center justify-center mb-3 relative overflow-hidden group">
//                     <img 
//                       src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
//                       alt={video.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                     <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
//                       <Video className="h-12 w-12 text-white group-hover:text-neon-purple transition-colors" />
//                     </div>
//                   </div>
//                   <h3 className="font-semibold text-white text-lg">{video.title}</h3>
//                   <p className="text-sm text-gray-300 mt-1 line-clamp-2">{video.description}</p>
//                   <span className="text-xs text-neon-purple mt-2 block">{video.game}</span>
//                 </div>
//               ))}
//             </div>

//             <DrawerFooter className="sticky bottom-0 bg-black/80 backdrop-blur-md">
//               <DrawerClose asChild>
//                 <Button variant="outline" className="border-neon-purple/50 text-white hover:bg-neon-purple/20">
//                   Close
//                 </Button>
//               </DrawerClose>
//             </DrawerFooter>
//           </DrawerContent>
//         </Drawer>
//       </div>

//       {/* Video Modal */}
//       {selectedVideo && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
//           <div className="relative w-full max-w-4xl">
//             <Button 
//               size="icon" 
//               variant="ghost" 
//               className="absolute -top-12 right-0 text-white hover:bg-neon-purple/20 transition-colors"
//               onClick={() => setSelectedVideo(null)}
//             >
//               <X className="h-6 w-6" />
//             </Button>
            
//             <div className="glass-panel rounded-xl overflow-hidden shadow-2xl border border-neon-purple/30">
//               <div className="aspect-video w-full">
//                 <iframe
//                   src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
//                   title={selectedVideo.title}
//                   className="w-full h-full"
//                   allowFullScreen
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 ></iframe>
//               </div>
//               <div className="p-6">
//                 <h2 className="text-2xl font-semibold neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
//                   {selectedVideo.title}
//                 </h2>
//                 <p className="text-gray-300 mt-2">{selectedVideo.description}</p>
//                 <span className="text-sm text-neon-purple mt-2 block">{selectedVideo.game}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TutorialButtons;


import { useState } from "react";
import { Youtube, Video, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

type TutorialVideo = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  game: string;
};

const tutorialVideos: TutorialVideo[] = [
  {
    id: "lol-basics",
    title: "LoL Basics",
    description: "Master the fundamentals of League of Legends.",
    youtubeId: "kjBo6jNKfPw",
    game: "League of Legends",
  },
  {
    id: "val-basics",
    title: "Valorant Basics",
    description: "Learn essential Valorant mechanics and strategies.",
    youtubeId: "XDOm0stH5V4&t",
    game: "Valorant",
  },
  {
    id: "ow2-basics",
    title: "Overwatch 2 Basics",
    description: "Get started with Overwatch 2 heroes and gameplay.",
    youtubeId: "u2mMbSKf6iE",
    game: "Overwatch 2",
  },
  {
    id: "apex-basics",
    title: "Apex Legends Basics",
    description: "Master movement and combat in Apex Legends.",
    youtubeId: "MWSRp4gAp6o",
    game: "Apex Legends",
  },
];

const TutorialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(null);
  const [selectedGame, setSelectedGame] = useState<string>("All");
  const isMobile = useIsMobile();

  const handleOpenVideo = (video: TutorialVideo) => {
    setSelectedVideo(video);
    setIsOpen(false);
  };

  const filteredVideos = selectedGame === "All"
    ? tutorialVideos
    : tutorialVideos.filter(video => video.game === selectedGame);

  return (
    <>
      {/* Floating button container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white transition-all duration-300"
            >
              <Youtube className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="glass-panel border-none max-h-[90vh] overflow-y-auto">
            <DrawerHeader className="sticky top-0 bg-black/80 backdrop-blur-md z-10">
              <DrawerTitle className="text-2xl neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
                Game Tutorials
              </DrawerTitle>
              <DrawerDescription className="text-gray-300">
                Select a game and master your skills
              </DrawerDescription>
            </DrawerHeader>

            {/* Game Selection */}
            <div className="px-4 pb-4">
              <Select onValueChange={setSelectedGame} defaultValue="All">
                <SelectTrigger className="w-full max-w-xs mx-auto bg-black/50 border-neon-purple/30 text-white">
                  <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-neon-purple/30 text-white">
                  <SelectItem value="All">All Games</SelectItem>
                  <SelectItem value="League of Legends">League of Legends</SelectItem>
                  <SelectItem value="Valorant">Valorant</SelectItem>
                  <SelectItem value="Overwatch 2">Overwatch 2</SelectItem>
                  <SelectItem value="Apex Legends">Apex Legends</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Video Grid */}
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="glass-panel rounded-lg p-4 cursor-pointer hover:border-neon-purple/50 hover:shadow-neon transition-all duration-300"
                  onClick={() => handleOpenVideo(video)}
                >
                  <div className="aspect-video bg-black/50 rounded-md flex items-center justify-center mb-3 relative overflow-hidden group">
                    <img 
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <Video className="h-12 w-12 text-white group-hover:text-neon-purple transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white text-lg">{video.title}</h3>
                  <p className="text-sm text-gray-300 mt-1 line-clamp-2">{video.description}</p>
                  <span className="text-xs text-neon-purple mt-2 block">{video.game}</span>
                </div>
              ))}
            </div>

            <DrawerFooter className="sticky bottom-0 bg-black/80 backdrop-blur-md">
              <DrawerClose asChild>
                <Button variant="outline" className="border-neon-purple/50 text-white hover:bg-neon-purple/20">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl">
            <div className="glass-panel rounded-xl overflow-hidden shadow-2xl border border-neon-purple/30 relative">
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-white hover:bg-neon-purple/20 transition-colors"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Video */}
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>

              {/* Info */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
                  {selectedVideo.title}
                </h2>
                <p className="text-gray-300 mt-2">{selectedVideo.description}</p>
                <span className="text-sm text-neon-purple mt-2 block">{selectedVideo.game}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TutorialButtons;
