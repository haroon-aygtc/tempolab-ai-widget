export interface WidgetAppearance {
  primaryColor: string;
  secondaryColor?: string;
  fontFamily: string;
  borderRadius: number;
  chatIconSize?: number;
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark" | "system" | "custom";
  headerText?: string;
  welcomeMessage?: string;
  chatWidth?: number;
  chatHeight?: number;
  iconType: "chat" | "message" | "help" | "custom";
  customIcon?: string;
  customTheme?: {
    name: string;
    colors: {
      background: string;
      foreground: string;
      primary: string;
      secondary: string;
      accent: string;
      muted: string;
    };
  };
}

export interface WidgetBehavior {
  autoOpen: boolean;
  autoOpenDelay: number;
  persistHistory: boolean;
  showBranding: boolean;
  allowAttachments: boolean;
  requireUserInfo: boolean;
  collectNameBeforeChat: boolean;
  collectEmailBeforeChat: boolean;
  initialMessage?: string;
  enableVoiceInput: boolean;
  enableAnimation: boolean;
  animationType: "fade" | "slide" | "bounce";
  autoResponse: boolean;
  autoResponseDelay: number;
}

export interface AIModel {
  id: string;
  name: string;
  description?: string;
  providerId: string;
}

export interface AIProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  isConfigured: boolean;
  apiKeyRequired: boolean;
  models: AIModel[];
}

export interface WidgetAIConfig {
  providerId: string;
  modelId: string;
  systemPrompt: string;
  fallbackMessage: string;
  temperature: number;
  maxTokens: number;
  enableMemory: boolean;
  memoryWindow: number;
}

export interface Widget {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  appearance: WidgetAppearance;
  behavior: WidgetBehavior;
  aiConfig: WidgetAIConfig;
}
