import React from "react";
import { VideoSetupProvider } from "@/contexts/VideoSetupContext";
import { SetupSection } from "./SetupSection";

export function SetupPage() {
  return (
    <VideoSetupProvider>
      <SetupSection />
    </VideoSetupProvider>
  );
}
