import React from "react";
import DesignerLayout from "../components/widget-designer/designer-layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const WidgetDesigner = () => {
  // Default widget configuration state
  const [widgetConfig, setWidgetConfig] = React.useState({
    appearance: {
      primaryColor: "#7c3aed",
      secondaryColor: "#f3f4f6",
      fontFamily: "Inter, sans-serif",
      borderRadius: 8,
      chatIconSize: "medium",
      position: "bottom-right",
      buttonText: "Chat with AI",
      headerText: "AI Assistant",
      welcomeMessage: "Hello! How can I help you today?",
    },
    behavior: {
      autoOpen: false,
      openDelay: 3,
      showBranding: true,
      persistConversation: true,
      enableAttachments: false,
      enableVoiceInput: false,
      enableAnimation: true,
      mobileOptimized: true,
    },
    aiConfig: {
      provider: "openai",
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: "You are a helpful assistant for our website visitors.",
    },
  });

  // Handle saving the widget configuration
  const handleSave = () => {
    // In a real implementation, this would save to backend
    console.log("Saving widget configuration:", widgetConfig);
    // Show success toast or notification
  };

  return (
    <div className="container mx-auto py-6 bg-background">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/widgets">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Widget Designer</h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Widget
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Widget Configuration</CardTitle>
          <CardDescription>
            Customize your AI chat widget's appearance, behavior, and AI
            settings. Changes will be reflected in the live preview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="designer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="designer">Designer</TabsTrigger>
              <TabsTrigger value="code">Embed Code</TabsTrigger>
            </TabsList>
            <TabsContent value="designer" className="w-full">
              <DesignerLayout
                widgetConfig={widgetConfig}
                setWidgetConfig={setWidgetConfig}
              />
            </TabsContent>
            <TabsContent value="code">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Embed Code</h3>
                <p className="text-sm text-muted-foreground">
                  Copy and paste this code snippet into your website's HTML to
                  embed the chat widget.
                </p>
                <div className="relative">
                  <pre className="p-4 rounded-md bg-muted overflow-x-auto">
                    <code className="text-sm">
                      {`<script src="https://example.com/widget/${Date.now()}.js" async></script>
<script>
  window.chatWidgetConfig = {
    widgetId: "${Date.now()}",
    // Configuration will be loaded automatically
  };
</script>`}
                    </code>
                  </pre>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `<script src="https://example.com/widget/${Date.now()}.js" async></script>\n<script>\n  window.chatWidgetConfig = {\n    widgetId: "${Date.now()}",\n    // Configuration will be loaded automatically\n  };\n</script>`,
                      );
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WidgetDesigner;
