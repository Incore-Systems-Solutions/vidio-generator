import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { VideoHistoryModal } from "./VideoHistoryModal";

interface NavbarWithModalProps {
  currentStep?: number;
  totalSteps?: number;
}

export function NavbarWithModal({
  currentStep = 1,
  totalSteps = 4,
}: NavbarWithModalProps) {
  const [isVideoHistoryOpen, setIsVideoHistoryOpen] = useState(false);

  const handleVideoHistoryClick = () => {
    setIsVideoHistoryOpen(true);
  };

  return (
    <>
      {/* Native-style Top Bar */}
      <div className="bg-slate-950 border-b border-slate-800/50">
        <Navbar
          currentStep={currentStep}
          totalSteps={totalSteps}
          onVideoHistoryClick={handleVideoHistoryClick}
        />
      </div>

      <VideoHistoryModal
        isOpen={isVideoHistoryOpen}
        onClose={() => setIsVideoHistoryOpen(false)}
      />
    </>
  );
}
