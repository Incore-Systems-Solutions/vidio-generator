import React, { useState, createContext, useContext } from "react";
import { VideoHistoryModal } from "./VideoHistoryModal";

interface VideoHistoryContextType {
  openVideoHistory: () => void;
}

const VideoHistoryContext = createContext<VideoHistoryContextType | null>(null);

export const useVideoHistory = () => {
  const context = useContext(VideoHistoryContext);
  if (!context) {
    throw new Error("useVideoHistory must be used within AppWrapper");
  }
  return context;
};

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isVideoHistoryOpen, setIsVideoHistoryOpen] = useState(false);

  const openVideoHistory = () => {
    console.log("Opening video history modal");
    setIsVideoHistoryOpen(true);
  };

  const contextValue: VideoHistoryContextType = {
    openVideoHistory,
  };

  return (
    <VideoHistoryContext.Provider value={contextValue}>
      {children}
      {/* Video History Modal */}
      <VideoHistoryModal
        isOpen={isVideoHistoryOpen}
        onClose={() => setIsVideoHistoryOpen(false)}
      />
    </VideoHistoryContext.Provider>
  );
}
