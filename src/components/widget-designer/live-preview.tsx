import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet } from "lucide-react";

// Import the widget container component directly using ESM import
import WidgetContainer from "@/components/chat-widget/widget-container";

interface LivePreviewProps {
  widgetConfig?: {
    appearance: {
      primaryColor: string;
      secondaryColor: string;
      fontFamily: string;
      borderRadius: number;
      chatIconSize: number;
      position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
      theme: "light" | "dark";
    };
    behavior: {
      initialMessage: string;
      autoOpen: boolean;
      openDelay: number;
      showBranding: boolean;
      persistHistory: boolean;
    };
    aiConfig: {
      provider: string;
      model: string;
      systemPrompt: string;
      temperature: number;
      maxTokens: number;
    };
  };
}

const defaultWidgetConfig = {
  appearance: {
    primaryColor: "#7C3AED",
    secondaryColor: "#F3F4F6",
    fontFamily: "Inter, sans-serif",
    borderRadius: 12,
    chatIconSize: 56,
    position: "bottom-right" as const,
    theme: "light",
  },
  behavior: {
    initialMessage: "Hello! How can I help you today?",
    autoOpen: false,
    openDelay: 3000,
    showBranding: true,
    persistHistory: true,
  },
  aiConfig: {
    provider: "OpenAI",
    model: "gpt-3.5-turbo",
    systemPrompt: "You are a helpful assistant.",
    temperature: 0.7,
    maxTokens: 1024,
  },
};

const LivePreview: React.FC<LivePreviewProps> = ({
  widgetConfig = defaultWidgetConfig,
}) => {
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const getDeviceWidth = () => {
    switch (deviceView) {
      case "desktop":
        return "w-full";
      case "tablet":
        return "w-[768px]";
      case "mobile":
        return "w-[375px]";
      default:
        return "w-full";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        <Tabs defaultValue="desktop" className="w-auto">
          <TabsList>
            <TabsTrigger
              value="desktop"
              onClick={() => setDeviceView("desktop")}
            >
              <Monitor className="h-4 w-4 mr-2" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="tablet" onClick={() => setDeviceView("tablet")}>
              <Tablet className="h-4 w-4 mr-2" />
              Tablet
            </TabsTrigger>
            <TabsTrigger value="mobile" onClick={() => setDeviceView("mobile")}>
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="flex-1 overflow-hidden border-2 border-dashed border-gray-200 bg-white">
        <div className="relative w-full h-full overflow-auto p-4">
          <div
            className={`mx-auto h-full ${getDeviceWidth()} bg-gray-100 rounded-lg flex flex-col`}
          >
            <div className="flex-1 p-4 relative">
              {/* Mockup website content */}
              <div className="mb-8">
                <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>

              <div className="mb-8">
                <div className="h-40 w-full bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>

              <div>
                <div className="h-8 w-36 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Widget container positioned according to config */}
              <div
                className={`absolute ${getPositionClasses(widgetConfig.appearance.position)}`}
              >
                {/* Pass the config as a single prop object to match whatever the component expects */}
                <WidgetContainer
                  title="Chat Assistant"
                  subtitle="Ask me anything!"
                  primaryColor={widgetConfig.appearance.primaryColor}
                  secondaryColor={widgetConfig.appearance.secondaryColor}
                  welcomeMessage={widgetConfig.behavior.initialMessage}
                  position={widgetConfig.appearance.position}
                  theme={widgetConfig.appearance.theme || "light"}
                  isOpen={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button variant="outline" className="mr-2">
          Reset Preview
        </Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

// Helper function to get position classes based on the widget position setting
const getPositionClasses = (position: string) => {
  switch (position) {
    case "bottom-right":
      return "bottom-4 right-4";
    case "bottom-left":
      return "bottom-4 left-4";
    case "top-right":
      return "top-4 right-4";
    case "top-left":
      return "top-4 left-4";
    default:
      return "bottom-4 right-4";
  }
};

export default LivePreview;
