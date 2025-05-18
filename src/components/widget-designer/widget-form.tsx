import { useState } from "react";
import { Widget, AIProvider } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppearanceTab } from "./appearance-tab";
import { BehaviorTab } from "./behavior-tab";
import { AIConfigTab } from "./ai-config-tab";
import { WidgetPreview } from "./widget-preview";

interface WidgetFormProps {
  widget: Widget;
  providers: AIProvider[];
  onSave: (widget: Widget) => void;
  onCancel: () => void;
}

export function WidgetForm({
  widget: initialWidget,
  providers,
  onSave,
  onCancel,
}: WidgetFormProps) {
  const [widget, setWidget] = useState<Widget>(initialWidget);
  const [name, setName] = useState(initialWidget.name);

  const handleSave = () => {
    onSave({ ...widget, name });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="widget-name">Widget Name</Label>
          <Input
            id="widget-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Chat Widget"
          />
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="appearance">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
                <TabsTrigger value="ai">AI Config</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="appearance">
                  <AppearanceTab
                    appearance={widget.appearance}
                    onChange={(appearance) =>
                      setWidget({ ...widget, appearance })
                    }
                  />
                </TabsContent>
                <TabsContent value="behavior">
                  <BehaviorTab
                    behavior={widget.behavior}
                    onChange={(behavior) => setWidget({ ...widget, behavior })}
                  />
                </TabsContent>
                <TabsContent value="ai">
                  <AIConfigTab
                    aiConfig={widget.aiConfig}
                    providers={providers}
                    onChange={(aiConfig) => setWidget({ ...widget, aiConfig })}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Widget</Button>
        </div>
      </div>

      <div className="lg:sticky lg:top-20 h-[600px]">
        <Card className="h-full overflow-hidden">
          <CardContent className="p-0 h-full">
            <WidgetPreview widget={{ ...widget, name }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
