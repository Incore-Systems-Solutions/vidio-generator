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
      if (existingData) {
        const updatedData = {
          ...existingData,
          ...paymentData,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      }
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
};
