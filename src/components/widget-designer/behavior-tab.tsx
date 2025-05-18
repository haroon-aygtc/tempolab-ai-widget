import { WidgetBehavior } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface BehaviorTabProps {
  behavior: WidgetBehavior;
  onChange: (behavior: WidgetBehavior) => void;
}

export function BehaviorTab({ behavior, onChange }: BehaviorTabProps) {
  const handleChange = (key: keyof WidgetBehavior, value: any) => {
    onChange({ ...behavior, [key]: value });
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
    </div>
  );
}
