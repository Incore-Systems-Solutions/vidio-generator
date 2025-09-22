import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface VideoSetupData {
  selectedCharacter: string | null;
  selectedBackground: string | null;
  characterImage: string | null;
  backgroundImage: string | null;
  prompt: string;
  aspekRasio: string;
  judulVideo: string;
  bahasa: string;
  gayaSuara: string;
  voiceOver: string;
  tone: string;
  backgroundMusic: string;
  resolusiVideo: string;
}

interface VideoSetupContextType {
  data: VideoSetupData;
  updateCharacter: (characterId: string, imageUrl: string | null) => void;
  updateBackground: (backgroundId: string, imageUrl: string | null) => void;
  updatePrompt: (prompt: string) => void;
  updateAspectRatio: (ratio: string) => void;
  updateJudulVideo: (judul: string) => void;
  updateBahasa: (bahasa: string) => void;
  updateGayaSuara: (gaya: string) => void;
  updateVoiceOver: (voice: string) => void;
  updateTone: (tone: string) => void;
  updateBackgroundMusic: (music: string) => void;
  updateResolusiVideo: (resolusi: string) => void;
  resetData: () => void;
}

const VideoSetupContext = createContext<VideoSetupContextType | undefined>(
  undefined
);

const initialData: VideoSetupData = {
  selectedCharacter: null,
  selectedBackground: null,
  characterImage: null,
  backgroundImage: null,
  prompt: "",
  aspekRasio: "",
  judulVideo: "",
  bahasa: "",
  gayaSuara: "",
  voiceOver: "",
  tone: "",
  backgroundMusic: "",
  resolusiVideo: "",
};

export function VideoSetupProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<VideoSetupData>(initialData);

  const updateCharacter = (characterId: string, imageUrl: string | null) => {
    setData((prev) => ({
      ...prev,
      selectedCharacter: characterId,
      characterImage: imageUrl,
    }));
  };

  const updateBackground = (backgroundId: string, imageUrl: string | null) => {
    setData((prev) => ({
      ...prev,
      selectedBackground: backgroundId,
      backgroundImage: imageUrl,
    }));
  };

  const updatePrompt = (prompt: string) => {
    setData((prev) => ({
      ...prev,
      prompt,
    }));
  };

  const updateAspectRatio = (ratio: string) => {
    setData((prev) => ({
      ...prev,
      aspekRasio: ratio,
    }));
  };

  const updateJudulVideo = (judul: string) => {
    setData((prev) => ({
      ...prev,
      judulVideo: judul,
    }));
  };

  const updateBahasa = (bahasa: string) => {
    setData((prev) => ({
      ...prev,
      bahasa: bahasa,
    }));
  };

  const updateGayaSuara = (gaya: string) => {
    setData((prev) => ({
      ...prev,
      gayaSuara: gaya,
    }));
  };

  const updateVoiceOver = (voice: string) => {
    setData((prev) => ({
      ...prev,
      voiceOver: voice,
    }));
  };

  const updateTone = (tone: string) => {
    setData((prev) => ({
      ...prev,
      tone: tone,
    }));
  };

  const updateBackgroundMusic = (music: string) => {
    setData((prev) => ({
      ...prev,
      backgroundMusic: music,
    }));
  };

  const updateResolusiVideo = (resolusi: string) => {
    setData((prev) => ({
      ...prev,
      resolusiVideo: resolusi,
    }));
  };

  const resetData = () => {
    setData(initialData);
  };

  return (
    <VideoSetupContext.Provider
      value={{
        data,
        updateCharacter,
        updateBackground,
        updatePrompt,
        updateAspectRatio,
        updateJudulVideo,
        updateBahasa,
        updateGayaSuara,
        updateVoiceOver,
        updateTone,
        updateBackgroundMusic,
        updateResolusiVideo,
        resetData,
      }}
    >
      {children}
    </VideoSetupContext.Provider>
  );
}

export function useVideoSetup() {
  const context = useContext(VideoSetupContext);
  if (context === undefined) {
    throw new Error("useVideoSetup must be used within a VideoSetupProvider");
  }
  return context;
}
