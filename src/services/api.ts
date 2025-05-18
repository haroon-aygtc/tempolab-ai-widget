import { Widget, AIProvider } from "@/types";

// Base API URL - would be set from environment variables in a real app
const API_BASE_URL = "https://api.chatembed.example.com";

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An unknown error occurred",
    }));
    throw new Error(
      error.message || `API request failed with status ${response.status}`,
    );
  }

  return response.json();
}

// Widget API endpoints
export const widgetApi = {
  getAll: () => apiRequest<Widget[]>("/widgets"),
  getById: (id: string) => apiRequest<Widget>(`/widgets/${id}`),
  create: (widget: Omit<Widget, "id" | "createdAt" | "updatedAt">) =>
    apiRequest<Widget>("/widgets", {
      method: "POST",
      body: JSON.stringify(widget),
    }),
  update: (id: string, widget: Partial<Widget>) =>
    apiRequest<Widget>(`/widgets/${id}`, {
      method: "PUT",
      body: JSON.stringify(widget),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/widgets/${id}`, {
      method: "DELETE",
    }),
};

// AI Provider API endpoints
export const providerApi = {
  getAll: () => apiRequest<AIProvider[]>("/providers"),
  getById: (id: string) => apiRequest<AIProvider>(`/providers/${id}`),
  configure: (id: string, config: { apiKey: string }) =>
    apiRequest<AIProvider>(`/providers/${id}/configure`, {
      method: "POST",
      body: JSON.stringify(config),
    }),
  testConnection: (id: string, message: string) =>
    apiRequest<{ success: boolean; response?: string; error?: string }>(
      `/providers/${id}/test`,
      {
        method: "POST",
        body: JSON.stringify({ message }),
      },
    ),
};

// Analytics API endpoints
export const analyticsApi = {
  getDashboardStats: () =>
    apiRequest<{
      totalConversations: number;
      activeUsers: number;
      avgResponseTime: number;
      satisfactionRate: number;
      trends: {
        conversations: { value: number; isPositive: boolean };
        users: { value: number; isPositive: boolean };
        responseTime: { value: number; isPositive: boolean };
        satisfaction: { value: number; isPositive: boolean };
      };
    }>("/analytics/dashboard"),
  getConversations: (params: { page?: number; limit?: number }) =>
    apiRequest<{
      data: Array<{
        id: string;
        widgetId: string;
        widgetName: string;
        userIdentifier: string;
        startedAt: string;
        messagesCount: number;
        duration: number;
      }>;
      total: number;
      page: number;
      limit: number;
    }>(
      `/analytics/conversations?${new URLSearchParams(params as any).toString()}`,
    ),
};

// Embed code API endpoints
export const embedApi = {
  generateCode: (widgetId: string, options: { format: "script" | "npm" }) =>
    apiRequest<{ code: string }>(`/embed/generate`, {
      method: "POST",
      body: JSON.stringify({ widgetId, options }),
    }),
};
