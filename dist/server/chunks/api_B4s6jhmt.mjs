const BASE_URL = "https://api.instantvideoapp.com";
const charactersApi = {
  async getCharacters() {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/characters`);
      const result = await response.json();
      if (!result.status) {
        throw new Error(result.message);
      }
      return result.data;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }
};
const backgroundsApi = {
  async getBackgrounds() {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/backgrounds`);
      const result = await response.json();
      if (!result.status) {
        throw new Error(result.message);
      }
      return result.data;
    } catch (error) {
      console.error("Error fetching backgrounds:", error);
      throw error;
    }
  }
};
const uploadApi = {
  async uploadImage(imageBase64) {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/upload-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: imageBase64
        })
      });
      const result = await response.json();
      if (!result.status) {
        throw new Error(result.message || "Upload failed");
      }
      return result.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
};
const videoStoreApi = {
  async storeVideoData(data) {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Store failed");
      }
      return result;
    } catch (error) {
      console.error("Error storing video data:", error);
      throw error;
    }
  }
};
const otpApi = {
  async requestOTP(data) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/video-ai/request-otp-koin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Request OTP failed");
      }
      return result;
    } catch (error) {
      console.error("Error requesting OTP:", error);
      throw error;
    }
  },
  async validateOTP(data) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/video-ai/validasi-otp-koin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Validate OTP failed");
      }
      return result;
    } catch (error) {
      console.error("Error validating OTP:", error);
      throw error;
    }
  }
};
const transactionApi = {
  async getTransaction(invoiceNumber) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/video-ai/transaksi/${invoiceNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Get transaction failed");
      }
      return result;
    } catch (error) {
      console.error("Error getting transaction:", error);
      throw error;
    }
  }
};
const videoGenerationApi = {
  async generateVideo(xApiKey) {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/generate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xApiKey
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Generate video failed");
      }
      return result;
    } catch (error) {
      console.error("Error generating video:", error);
      throw error;
    }
  },
  async checkVideoStatus(taskId) {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/check/${taskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Check video status failed");
      }
      return result;
    } catch (error) {
      console.error("Error checking video status:", error);
      throw error;
    }
  },
  async convertVideoForPlatform(videoUrl, platform, taskId) {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          video_url: videoUrl,
          platform,
          task_id: taskId
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Video conversion failed");
      }
      return result;
    } catch (error) {
      console.error("Error converting video:", error);
      throw error;
    }
  }
};

export { videoStoreApi as a, backgroundsApi as b, charactersApi as c, otpApi as o, transactionApi as t, uploadApi as u, videoGenerationApi as v };
