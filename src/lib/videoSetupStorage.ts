// Video Setup Data Utilities
export interface VideoSetupData {
  prompt: string;
  karakter_image: string;
  background_image: string;
  aspek_rasio: string;
  judul_video: string;
  bahasa: string;
  gaya_suara: string;
  voice_over: string;
  tone: string;
  background_music: string;
  resolusi_video: string;
  is_share: "y" | "n";
  // Payment related fields
  email?: string;
  no_wa?: string;
  metode_pengiriman?: string;
  metode?: string | null;
  jumlah?: number | null;
}

const STORAGE_KEY = "videoSetupData";

export const videoSetupStorage = {
  // Save video setup data to localStorage
  save: (data: VideoSetupData): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Update existing video setup data with payment info
  updatePaymentInfo: (paymentData: {
    email: string;
    no_wa: string;
    metode_pengiriman: string;
    metode: string | null;
    jumlah?: number | null;
  }): void => {
    try {
      const existingData = videoSetupStorage.load();
      const updatedData = {
        // Provide defaults for required fields if existingData doesn't exist
        prompt: "",
        karakter_image: "",
        background_image: "",
        aspek_rasio: "",
        judul_video: "",
        bahasa: "",
        gaya_suara: "",
        voice_over: "",
        tone: "",
        background_music: "",
        resolusi_video: "",
        is_share: "n" as "y" | "n",
        // Merge with existing data if available
        ...existingData,
        // Apply payment data
        ...paymentData,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      console.log("Payment info updated successfully:", updatedData);
    } catch (error) {
      console.error("Error updating payment info:", error);
    }
  },

  // Load video setup data from localStorage
  load: (): VideoSetupData | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error loading video setup data:", error);
      return null;
    }
  },

  // Clear video setup data from localStorage
  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Check if video setup data exists
  exists: (): boolean => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  },

  // Debug function to inspect localStorage
  debug: (): void => {
    const data = localStorage.getItem(STORAGE_KEY);
    console.log("videoSetupStorage debug:", {
      key: STORAGE_KEY,
      exists: data !== null,
      rawData: data,
      parsedData: data ? JSON.parse(data) : null,
    });
  },
};
