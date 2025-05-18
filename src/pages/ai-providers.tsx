import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ProviderList } from "@/components/ai-providers/provider-list";
import { AIProvider, AIModel } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for demonstration
const initialProviders: AIProvider[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=gemini",
    description:
      "Google's advanced language model with strong reasoning capabilities",
    isConfigured: false,
    apiKeyRequired: true,
    models: [
      {
        id: "gemini-pro",
        name: "Gemini Pro",
        description: "Balanced model for most use cases",
        providerId: "gemini",
      },
      {
        id: "gemini-ultra",
        name: "Gemini Ultra",
        description: "Most capable model for complex tasks",
        providerId: "gemini",
      },
    ],
  },
  {
    id: "mistral",
    name: "Mistral AI",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=mistral",
    description:
      "Efficient and powerful language models with excellent performance",
    isConfigured: false,
    apiKeyRequired: true,
    models: [
      {
        id: "mistral-small",
        name: "Mistral Small",
        description: "Efficient model for everyday tasks",
        providerId: "mistral",
      },
      {
        id: "mistral-medium",
        name: "Mistral Medium",
        description: "Balanced performance and capabilities",
        providerId: "mistral",
      },
      {
        id: "mistral-large",
        name: "Mistral Large",
        description: "Most capable Mistral model",
        providerId: "mistral",
      },
    ],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=openrouter",
    description: "Access to multiple AI models through a single API",
    isConfigured: false,
    apiKeyRequired: true,
    models: [
      {
        id: "openrouter-llama3",
        name: "Llama 3",
        description: "Meta's open source large language model",
        providerId: "openrouter",
      },
      {
        id: "openrouter-claude",
        name: "Claude",
        description: "Anthropic's helpful and harmless assistant",
        providerId: "openrouter",
      },
    ],
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=huggingface",
    description: "Open-source AI community with thousands of models",
    isConfigured: false,
    apiKeyRequired: true,
    models: [
      {
        id: "huggingface-falcon",
        name: "Falcon",
        description: "Open-source large language model",
        providerId: "huggingface",
      },
      {
        id: "huggingface-bloom",
        name: "BLOOM",
        description: "Multilingual large language model",
        providerId: "huggingface",
      },
    ],
  },
];

export default function AIProvidersPage() {
  const [providers, setProviders] = useState<AIProvider[]>(initialProviders);
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<AIProvider | null>(
    null,
  );
  const [apiKey, setApiKey] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isTesting, setIsTesting] = useState(false);

  const handleConfigureProvider = (provider: AIProvider) => {
    setCurrentProvider(provider);
    setApiKey(provider.isConfigured ? "********" : "");
    setIsConfigureDialogOpen(true);
  };

  const handleSaveConfiguration = () => {
    if (currentProvider) {
      setProviders(
        providers.map((p) =>
          p.id === currentProvider.id ? { ...p, isConfigured: true } : p,
        ),
      );
      setIsConfigureDialogOpen(false);
      setCurrentProvider(null);
      setApiKey("");
    }
  };

  const handleTestConnection = () => {
    setIsTesting(true);
    // Simulate API call
    setTimeout(() => {
      setTestResponse(
        "Connection successful! The API key is valid and the model responded correctly.",
      );
      setIsTesting(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <ProviderList
        providers={providers}
        onConfigureProvider={handleConfigureProvider}
      />

      <Dialog
        open={isConfigureDialogOpen}
        onOpenChange={setIsConfigureDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {currentProvider?.name}</DialogTitle>
            <DialogDescription>
              Set up your API credentials to connect to {currentProvider?.name}.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="setup">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="test">Test Connection</TabsTrigger>
            </TabsList>
            <TabsContent value="setup" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
                <p className="text-sm text-muted-foreground">
                  You can find your API key in your {currentProvider?.name}{" "}
                  dashboard.
                </p>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Available Models</CardTitle>
                  <CardDescription>
                    These models will be available for your chat widgets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentProvider?.models.map((model) => (
                      <li key={model.id} className="flex items-start gap-2">
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {model.description}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="test-message">Test Message</Label>
                <Input
                  id="test-message"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="Enter a test message"
                />
              </div>

              <Button
                onClick={handleTestConnection}
                disabled={!apiKey || !testMessage || isTesting}
                className="w-full"
              >
                {isTesting ? "Testing..." : "Test Connection"}
              </Button>

              {testResponse && (
                <div className="p-4 bg-muted rounded-md">
                  <h4 className="font-medium mb-2">Response:</h4>
                  <p className="text-sm">{testResponse}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsConfigureDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveConfiguration} disabled={!apiKey}>
              Save Configuration
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
