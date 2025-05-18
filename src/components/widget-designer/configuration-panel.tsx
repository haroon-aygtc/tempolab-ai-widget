import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AppearanceTab } from "./appearance-tab";
import { BehaviorTab } from "./behavior-tab";
import { AIConfigTab } from "./ai-config-tab";
import { WidgetAppearance, WidgetBehavior, WidgetAIConfig } from "@/types";

interface ConfigurationPanelProps {
  widgetConfig: {
    appearance: WidgetAppearance;
    behavior: WidgetBehavior;
    aiConfig: WidgetAIConfig;
  };
  onConfigChange: (config: any) => void;
}

const ConfigurationPanel = ({
  widgetConfig = {
    appearance: {},
    behavior: {},
    aiConfig: {},
  },
  onConfigChange = () => {},
}: ConfigurationPanelProps) => {
  const [activeTab, setActiveTab] = useState("appearance");

  const handleConfigChange = (section: string, values: any) => {
    onConfigChange({
      ...widgetConfig,
      [section]: {
        ...widgetConfig[section],
        ...values,
      },
    });
  };

  return (
    <Card className="h-full w-full overflow-hidden bg-background border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Widget Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Customize your chat widget appearance and behavior
        </p>
      </div>

      <Tabs
        defaultValue="appearance"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
          </TabsList>
        </div>

        <div
          className="p-4 overflow-y-auto"
          style={{ height: "calc(100vh - 220px)" }}
        >
          <TabsContent value="appearance" className="mt-0">
            <AppearanceTab
              appearance={widgetConfig.appearance || {}}
              onChange={(values) => handleConfigChange("appearance", values)}
            />
          </TabsContent>

          <TabsContent value="behavior" className="mt-0">
            <BehaviorTab
              behavior={widgetConfig.behavior || {}}
              onChange={(values) => handleConfigChange("behavior", values)}
            />
          </TabsContent>

          <TabsContent value="ai" className="mt-0">
            <AIConfigTab
              aiConfig={widgetConfig.aiConfig || {}}
              providers={[
                {
                  id: "openai",
                  name: "OpenAI",
                  isConfigured: true,
                  models: [
                    {
                      id: "gpt-3.5-turbo",
                      name: "GPT-3.5 Turbo",
                    },
                    {
                      id: "gpt-4",
                      name: "GPT-4",
                    },
                  ],
                },
              ]}
              onChange={(values) => handleConfigChange("aiConfig", values)}
            />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default ConfigurationPanel;
