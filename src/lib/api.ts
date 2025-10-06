// API Services
const BASE_URL = "https://api.instantvideoapp.com";

export interface Character {
  id: string;
  type: "upload" | "character";
  title: string;
  description: string | null;
  image: string | null;
  tags: string[] | null;
}

export interface Background {
  id: string;
  type: "upload" | "background";
  title: string;
  description: string | null;
  image: string | null;
  tags: string[] | null;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface VideoHistoryItem {
  id: number;
  user_video_id: string;
  task_id: string | null;
  prompt: string;
  model_ai: string;
  aspect_ratio: string;
  enableFallback: number;
  enableTranslation: number;
  seeds: string | null;
  image_urls: string;
  status_video: string;
  created_at: string;
  updated_at: string;
  bahasa: string | null;
  gaya_suara: string | null;
  voice_over: string | null;
  tone: string | null;
  background_music: string | null;
  resolusi_video: string;
  url_video: string | null;
  url_video_share: string | null;
  share_url: string;
}

export interface VideoHistoryResponse {
  status: boolean;
  message: string;
  current_page: number;
  last_page: number;
  per_page: string;
  total: number;
  data: VideoHistoryItem[];
}

export interface CoinData {
  id: number;
  quota: number;
  hari_ini: number;
  minggu_ini: number;
}

export interface CoinResponse {
  status: boolean;
  data: CoinData;
}

export interface OTPRequest {
  username: string;
}

export interface OTPVerifyRequest {
  username: string;
  otp: string;
}

export interface OTPResponse {
  status: boolean;
  message: string;
  data: {
    "x-api-key": string;
  };
}

// Characters API
export const charactersApi = {
  async getCharacters(): Promise<Character[]> {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/characters`);
      const result: ApiResponse<Character[]> = await response.json();

      if (!result.status) {
        throw new Error(result.message);
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  },
};

// Backgrounds API
export const backgroundsApi = {
  async getBackgrounds(): Promise<Background[]> {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/backgrounds`);
      const result: ApiResponse<Background[]> = await response.json();

      if (!result.status) {
        throw new Error(result.message);
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching backgrounds:", error);
      throw error;
    }
  },
};

// Upload API
export const uploadApi = {
  async uploadImage(
    imageBase64: string
  ): Promise<{ url: string; file_name: string }> {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/upload-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageBase64,
        }),
      });

      const result: ApiResponse<{ file_name: string; url: string }> =
        await response.json();

      if (!result.status) {
        throw new Error(result.message || "Upload failed");
      }

      return result.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
};

// Video AI Store API
export interface VideoStoreData {
  prompt: string;
  karakter_image: string;
  background_image: string;
  aspek_rasio: string;
  seeds?: string | null;
  model_ai?: string;
  metode_pengiriman?: string;
  metode?: string | null;
  jumlah?: number | null;
  email?: string;
  no_wa?: string | null;
  affiliate_by?: string;
  is_share?: "y" | "n";
}

export const videoStoreApi = {
  async storeVideoData(data: VideoStoreData): Promise<{
    status: boolean;
    message: string;
    data: {
      is_payment: boolean;
      invoice: string;
      "x-api-key": string;
    };
  }> {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
  },
};

// OTP API
export interface RequestOTPData {
  email: string;
}

export interface ValidateOTPData {
  email: string;
  otp: number;
}

export interface ValidateOTPResponse {
  status: boolean;
  message: string;
  data?: {
    quota: number;
  };
}

export const otpApi = {
  async requestOTP(data: RequestOTPData): Promise<OTPResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/video-ai/request-otp-koin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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

  async validateOTP(data: ValidateOTPData): Promise<ValidateOTPResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/video-ai/validasi-otp-koin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
  },
};

// Transaction API
export interface TransactionData {
  id: number;
  user_video_id: number;
  quantity: number;
  invoice_number: string;
  order_id: string;
  transaction_status: string;
  payment_type: string;
  payment_url: string;
  total_fee: number;
  total_payment: number;
  referral_by: string | null;
  status_ref: string;
  promo: number;
  subtotal: number;
  transaction_expired: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TransactionResponse {
  status: boolean;
  message: string;
  data: TransactionData;
}

export const transactionApi = {
  async getTransaction(invoiceNumber: string): Promise<TransactionResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/video-ai/transaksi/${invoiceNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
  },
};

// Video Generation API
export interface VideoGenerationData {
  id: number;
  user_video_id: string;
  task_id: string;
  prompt: string;
  model_ai: string;
  aspect_ratio: string;
  enableFallback: number;
  enableTranslation: number;
  seeds: string | null;
  image_urls: string;
  status_video: string;
  created_at: string;
  updated_at: string;
}

export interface VideoGenerationResponse {
  status: boolean;
  message: string;
  data: VideoGenerationData;
}

export const videoGenerationApi = {
  async generateVideo(xApiKey: string): Promise<VideoGenerationResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/generate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xApiKey,
        },
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

  async checkVideoStatus(taskId: string): Promise<{
    status: boolean;
    message: string;
    data: {
      status_video: string;
      task_id: string;
      resultUrl: string;
    };
  }> {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/check/${taskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

  async convertVideoForPlatform(
    videoUrl: string,
    platform: string,
    taskId: string
  ): Promise<{
    status: boolean;
    message: string;
    data: {
      convertedUrl: string;
      platform: string;
      format: string;
    };
  }> {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_url: videoUrl,
          platform: platform,
          task_id: taskId,
        }),
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
  },
};

// Public Video Gallery API
export interface PublicVideoItem {
  id: number;
  user_video_id: string;
  share_url: "y" | "n";
  url_video: string;
  prompt: string;
  user: {
    id: number;
    name: string;
  };
}

export interface PublicVideoGalleryResponse {
  status: boolean;
  message: string;
  data: PublicVideoItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const publicVideoGalleryApi = {
  async getPublicVideos(
    page: number = 1,
    perPage: number = 10
  ): Promise<PublicVideoGalleryResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/video-ai/public?page=${page}&per_page=${perPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch public videos");
      }

      return result;
    } catch (error) {
      console.error("Error fetching public videos:", error);
      throw error;
    }
  },

  async getVideoDetail(id: string): Promise<{
    status: boolean;
    message: string;
    data: {
      id: number;
      user_video_id: string;
      task_id: string;
      prompt: string;
      model_ai: string;
      aspect_ratio: string;
      enableFallback: number;
      enableTranslation: number;
      seeds: string | null;
      image_urls: string;
      status_video: string;
      created_at: string;
      updated_at: string;
      bahasa: string | null;
      gaya_suara: string | null;
      voice_over: string | null;
      tone: string | null;
      background_music: string | null;
      resolusi_video: string | null;
      url_video: string;
      url_video_share: string | null;
      share_url: string;
      karakter_image: string | null;
      background_image: string | null;
      user: {
        id: number;
        name: string;
      };
    };
  }> {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/public/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch video detail");
      }

      return result;
    } catch (error) {
      console.error("Error fetching video detail:", error);
      throw error;
    }
  },
};
// Chat AI API
export interface ChatAIInitResponse {
  status: boolean;
  message: string;
  data: {
    uuid: string;
    message: {
      role: "assistant";
      content: string;
    };
  };
}

export interface ChatAIReplyResponse {
  status: boolean;
  message: string;
  data: {
    is_done: boolean;
    message: {
      role: "assistant";
      content: string;
    };
  };
}

export const chatAIApi = {
  async initChat(xApiKey: string): Promise<ChatAIInitResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/chat-ai`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xApiKey,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to initialize chat");
      }

      return result;
    } catch (error) {
      console.error("Error initializing chat:", error);
      throw error;
    }
  },

  async sendReply(
    uuid: string,
    message: string,
    xApiKey: string
  ): Promise<ChatAIReplyResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/chat-ai/replies/${uuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xApiKey,
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send reply");
      }

      return result;
    } catch (error) {
      console.error("Error sending reply:", error);
      throw error;
    }
  },
};

export const videoHistoryApi = {
  async requestOTP(
    username: string
  ): Promise<{ status: boolean; message: string }> {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "OTP request failed");
      }

      return result;
    } catch (error) {
      console.error("Error requesting OTP:", error);
      throw error;
    }
  },

  async verifyOTP(username: string, otp: string): Promise<OTPResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, otp }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "OTP verification failed");
      }

      return result;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  },

  async getVideoList(
    xApiKey: string,
    page: number = 1,
    perPage: number = 5
  ): Promise<VideoHistoryResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/video-ai/check-list-video?page=${page}&per_page=${perPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xApiKey,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch video list");
      }

      return result;
    } catch (error) {
      console.error("Error fetching video list:", error);
      throw error;
    }
  },

  async getCoinBalance(xApiKey: string): Promise<CoinResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/video-ai/check-koin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xApiKey,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch coin balance");
      }

      return result;
    } catch (error) {
      console.error("Error fetching coin balance:", error);
      throw error;
    }
  },
};
