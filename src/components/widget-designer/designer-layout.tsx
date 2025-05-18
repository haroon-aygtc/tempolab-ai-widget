import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfigurationPanel from "./configuration-panel";
import LivePreview from "./live-preview";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface WidgetSettings {
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: number;
    buttonStyle: "rounded" | "square" | "pill";
    chatWidth: number;
    chatHeight: number;
    position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    iconType: "chat" | "message" | "help" | "custom";
    customIcon?: string;
    headerText: string;
    welcomeMessage: string;
  };
  behavior: {
    openOnLoad: boolean;
    showMinimized: boolean;
    triggerDelay: number;
    persistConversation: boolean;
    enableAttachments: boolean;
    enableVoiceInput: boolean;
    enableAnimation: boolean;
    animationType: "fade" | "slide" | "bounce";
    autoResponse: boolean;
    autoResponseDelay: number;
  };
  aiSettings: {
    provider: string;
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
    fallbackMessage: string;
    enableMemory: boolean;
    memoryWindow: number;
  };
}

const defaultWidgetSettings: WidgetSettings = {
  appearance: {
    primaryColor: "#7C3AED",
    secondaryColor: "#F5F5F5",
    fontFamily: "Inter",
    borderRadius: 8,
    buttonStyle: "rounded",
    chatWidth: 350,
    chatHeight: 500,
    position: "bottom-right",
    iconType: "chat",
    headerText: "Chat with AI Assistant",
    welcomeMessage: "Hello! How can I help you today?",
  },
  behavior: {
    openOnLoad: false,
    showMinimized: true,
    triggerDelay: 0,
    persistConversation: true,
    enableAttachments: false,
    enableVoiceInput: false,
    enableAnimation: true,
    animationType: "fade",
    autoResponse: false,
    autoResponseDelay: 3000,
  },
  aiSettings: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 1024,
    systemPrompt: "You are a helpful assistant.",
    fallbackMessage:
      "I apologize, but I couldn't process your request. Please try again.",
    enableMemory: true,
    memoryWindow: 10,
  },
};

const DesignerLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("appearance");
  const [widgetSettings, setWidgetSettings] = useState<WidgetSettings>(
    defaultWidgetSettings,
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSettingsChange = (
    category: keyof WidgetSettings,
    settings: any,
  ) => {
    setWidgetSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...settings,
      },
    }));
  };

  const handleSave = () => {
    // Save widget settings to backend
    console.log("Saving widget settings:", widgetSettings);
    // Show success message
    alert("Widget settings saved successfully!");
  };

  return (
    <div className="flex flex-col w-full h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/widgets")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? "Edit Widget" : "Create New Widget"}
          </h1>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Widget
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-73px)] overflow-hidden">
        <div className="w-full lg:w-1/3 p-4 border-r overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="aiSettings">AI Settings</TabsTrigger>
            </TabsList>

            <Card className="p-4">
              <ConfigurationPanel
                activeTab={activeTab}
                settings={widgetSettings}
                onSettingsChange={handleSettingsChange}
              />
            </Card>
          </Tabs>
        </div>

        <div className="w-full lg:w-2/3 p-4 bg-gray-50 overflow-y-auto">
          <LivePreview settings={widgetSettings} />
        </div>
      </div>
    </div>
  );
};

export default DesignerLayout;
