// Storage helper untuk web dan mobile
// Menangani localStorage yang tidak tersedia saat SSR

export const storage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Storage getItem error:", error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Storage setItem error:", error);
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Storage removeItem error:", error);
    }
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  },
};
