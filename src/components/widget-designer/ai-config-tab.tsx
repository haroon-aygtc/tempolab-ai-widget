import { WidgetAIConfig, AIProvider, AIModel } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface AIConfigTabProps {
  aiConfig: WidgetAIConfig;
  providers: AIProvider[];
  onChange: (aiConfig: WidgetAIConfig) => void;
}

export function AIConfigTab({
  aiConfig,
  providers,
  onChange,
}: AIConfigTabProps) {
  const handleChange = (key: keyof WidgetAIConfig, value: any) => {
    onChange({ ...aiConfig, [key]: value });
  };

  const selectedProvider = providers.find((p) => p.id === aiConfig.providerId);
  const availableModels = selectedProvider?.models || [];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">AI Provider</h3>
        <div className="grid gap-2">
          <Label htmlFor="ai-provider">Provider</Label>
          <Select
            value={aiConfig.providerId}
            onValueChange={(value) => {
              const provider = providers.find((p) => p.id === value);
              const firstModel = provider?.models[0];
              handleChange("providerId", value);
              if (firstModel) {
                handleChange("modelId", firstModel.id);
              }
            }}
          >
            <SelectTrigger id="ai-provider">
              <SelectValue placeholder="Select AI provider" />
            </SelectTrigger>
            <SelectContent>
              {providers
                .filter((p) => p.isConfigured)
                .map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedProvider && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Model</h3>
          <div className="grid gap-2">
            <Label htmlFor="ai-model">Model</Label>
            <Select
              value={aiConfig.modelId}
              onValueChange={(value) => handleChange("modelId", value)}
            >
              <SelectTrigger id="ai-model">
                <SelectValue placeholder="Select AI model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">System Prompt</h3>
        <div className="grid gap-2">
          <Label htmlFor="system-prompt">Instructions for the AI</Label>
          <Textarea
            id="system-prompt"
            value={aiConfig.systemPrompt}
            onChange={(e) => handleChange("systemPrompt", e.target.value)}
            placeholder="You are a helpful customer support assistant..."
            className="min-h-32"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Fallback Message</h3>
        <div className="grid gap-2">
          <Label htmlFor="fallback-message">
            Message when AI cannot respond
          </Label>
          <Input
            id="fallback-message"
            value={aiConfig.fallbackMessage}
            onChange={(e) => handleChange("fallbackMessage", e.target.value)}
            placeholder="I'm sorry, I couldn't understand that. Could you rephrase?"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Temperature</h3>
          <span className="text-sm text-muted-foreground">
            {aiConfig.temperature.toFixed(1)}
          </span>
        </div>
        <div className="grid gap-2">
          <Slider
            value={[aiConfig.temperature]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={(value) => handleChange("temperature", value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Max Tokens</h3>
          <span className="text-sm text-muted-foreground">
            {aiConfig.maxTokens}
          </span>
        </div>
        <Slider
          value={[aiConfig.maxTokens]}
          min={100}
          max={4000}
          step={100}
          onValueChange={(value) => handleChange("maxTokens", value[0])}
        />
      </div>
    </div>
  );
}
