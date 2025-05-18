import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Widget } from "@/types";
import { Copy, Check } from "lucide-react";

interface EmbedCodeGeneratorProps {
  widgets: Widget[];
}

export function EmbedCodeGenerator({ widgets }: EmbedCodeGeneratorProps) {
  const [selectedWidgetId, setSelectedWidgetId] = useState<string>(
    widgets[0]?.id || "",
  );
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("script");

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  const scriptCode = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cw','https://chat-embed.example.com/widget.js'));
  cw('init', { widgetId: '${selectedWidgetId}' });
</script>`;

  const npmCode = `npm install @chat-embed/react

// In your React component
import { ChatWidget } from '@chat-embed/react';

function App() {
  return (
    <ChatWidget widgetId="${selectedWidgetId}" />
  );
}`;

  const handleCopy = () => {
    const codeToCopy = activeTab === "script" ? scriptCode : npmCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Embed Code</CardTitle>
        <CardDescription>
          Select a widget and copy the code to embed it on your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select Widget
            </label>
            <Select
              value={selectedWidgetId}
              onValueChange={setSelectedWidgetId}
              disabled={widgets.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a widget" />
              </SelectTrigger>
              <SelectContent>
                {widgets.map((widget) => (
                  <SelectItem key={widget.id} value={widget.id}>
                    {widget.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedWidget && (
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="script">Script Tag</TabsTrigger>
                  <TabsTrigger value="npm">NPM Package</TabsTrigger>
                </TabsList>
                <TabsContent value="script" className="mt-4">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      {scriptCode}
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="npm" className="mt-4">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      {npmCode}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Widget Preview</h4>
                <div className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: selectedWidget.appearance.primaryColor,
                    }}
                  />
                  <span className="text-sm">{selectedWidget.name}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {selectedWidget.appearance.welcomeMessage.substring(0, 100)}
                  ...
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCopy}
          className="w-full"
          disabled={!selectedWidget}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" /> Copy Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
