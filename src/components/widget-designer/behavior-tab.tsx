import { WidgetBehavior } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, Sparkles } from "lucide-react";

interface BehaviorTabProps {
  behavior: WidgetBehavior;
  onChange: (behavior: WidgetBehavior) => void;
}

export function BehaviorTab({ behavior, onChange }: BehaviorTabProps) {
  const handleChange = (key: keyof WidgetBehavior, value: any) => {
    onChange({ ...behavior, [key]: value });
  };

  // Set default values for new properties if they don't exist
  const behaviorWithDefaults = {
    enableVoiceInput: false,
    enableAnimation: true,
    animationType: "fade",
    autoResponse: false,
    autoResponseDelay: 3000,
    ...behavior,
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Auto Open</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-open">Auto open chat widget</Label>
          <Switch
            id="auto-open"
            checked={behavior.autoOpen}
            onCheckedChange={(checked) => handleChange("autoOpen", checked)}
          />
        </div>
        {behavior.autoOpen && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-open-delay">
                Delay before opening (seconds)
              </Label>
              <span className="text-sm text-muted-foreground">
                {behavior.autoOpenDelay}s
              </span>
            </div>
            <Slider
              id="auto-open-delay"
              value={[behavior.autoOpenDelay]}
              min={0}
              max={60}
              step={1}
              onValueChange={(value) => handleChange("autoOpenDelay", value[0])}
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">History & Storage</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="persist-history">Persist conversation history</Label>
          <Switch
            id="persist-history"
            checked={behavior.persistHistory}
            onCheckedChange={(checked) =>
              handleChange("persistHistory", checked)
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Branding</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-branding">Show "Powered by" branding</Label>
          <Switch
            id="show-branding"
            checked={behavior.showBranding}
            onCheckedChange={(checked) => handleChange("showBranding", checked)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Attachments</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="allow-attachments">Allow file attachments</Label>
          <Switch
            id="allow-attachments"
            checked={behavior.allowAttachments}
            onCheckedChange={(checked) =>
              handleChange("allowAttachments", checked)
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">User Information</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="require-user-info">Collect user information</Label>
          <Switch
            id="require-user-info"
            checked={behavior.requireUserInfo}
            onCheckedChange={(checked) =>
              handleChange("requireUserInfo", checked)
            }
          />
        </div>
        {behavior.requireUserInfo && (
          <div className="space-y-2 pl-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="collect-name">Collect name</Label>
              <Switch
                id="collect-name"
                checked={behavior.collectNameBeforeChat}
                onCheckedChange={(checked) =>
                  handleChange("collectNameBeforeChat", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="collect-email">Collect email</Label>
              <Switch
                id="collect-email"
                checked={behavior.collectEmailBeforeChat}
                onCheckedChange={(checked) =>
                  handleChange("collectEmailBeforeChat", checked)
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Input Options</h3>
        <div className="flex items-center justify-between">
          <Label
            htmlFor="enable-voice-input"
            className="flex items-center gap-2"
          >
            <Mic className="h-4 w-4 text-muted-foreground" />
            Enable voice input
          </Label>
          <Switch
            id="enable-voice-input"
            checked={behaviorWithDefaults.enableVoiceInput}
            onCheckedChange={(checked) =>
              handleChange("enableVoiceInput", checked)
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Animation Settings</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="enable-animation" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            Enable animations
          </Label>
          <Switch
            id="enable-animation"
            checked={behaviorWithDefaults.enableAnimation}
            onCheckedChange={(checked) =>
              handleChange("enableAnimation", checked)
            }
          />
        </div>

        {behaviorWithDefaults.enableAnimation && (
          <div className="grid gap-2 pl-6">
            <Label htmlFor="animation-type">Animation Type</Label>
            <Select
              id="animation-type"
              value={behaviorWithDefaults.animationType}
              onValueChange={(value) => handleChange("animationType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select animation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fade">Fade</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="bounce">Bounce</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Auto Response</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-response">Enable auto response</Label>
          <Switch
            id="auto-response"
            checked={behaviorWithDefaults.autoResponse}
            onCheckedChange={(checked) => handleChange("autoResponse", checked)}
          />
        </div>
        {behaviorWithDefaults.autoResponse && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-response-delay">
                Auto response delay (ms)
              </Label>
              <span className="text-sm text-muted-foreground">
                {behaviorWithDefaults.autoResponseDelay}ms
              </span>
            </div>
            <Slider
              id="auto-response-delay"
              value={[behaviorWithDefaults.autoResponseDelay]}
              min={500}
              max={10000}
              step={500}
              onValueChange={(value) =>
                handleChange("autoResponseDelay", value[0])
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
