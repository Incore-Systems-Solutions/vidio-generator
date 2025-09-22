const STORAGE_KEY = "videoSetupData";
const videoSetupStorage = {
  // Save video setup data to localStorage
  save: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  // Update existing video setup data with payment info
  updatePaymentInfo: (paymentData) => {
    try {
      const existingData = videoSetupStorage.load();
      if (existingData) {
        const updatedData = {
          ...existingData,
          ...paymentData
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error("Error updating payment info:", error);
    }
  },
  // Load video setup data from localStorage
  load: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error loading video setup data:", error);
      return null;
    }
  },
  // Clear video setup data from localStorage
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
  // Check if video setup data exists
  exists: () => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }
};

export { videoSetupStorage as v };
