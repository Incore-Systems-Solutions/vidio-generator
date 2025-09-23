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
      <Navbar
        currentStep={currentStep}
        totalSteps={totalSteps}
        onVideoHistoryClick={handleVideoHistoryClick}
      />
      <VideoHistoryModal
        isOpen={isVideoHistoryOpen}
        onClose={() => setIsVideoHistoryOpen(false)}
      />
    </>
  );
}
