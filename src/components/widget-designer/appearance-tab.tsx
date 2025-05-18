import React, { useState } from "react";
import { WidgetAppearance } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sun,
  Moon,
  Layers,
  Palette,
  Wand2,
  Sparkles,
  Type,
  Info,
  Check,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppearanceTabProps {
  appearance: WidgetAppearance;
  onChange: (appearance: Partial<WidgetAppearance>) => void;
}

export function AppearanceTab({
  appearance = {
    theme: "light",
    primaryColor: "#7C3AED",
    secondaryColor: "#F3F4F6",
    fontFamily: "Inter",
    borderRadius: 8,
    position: "bottom-right",
    headerText: "Chat with AI Assistant",
    welcomeMessage: "Hello! How can I help you today?",
    chatIconSize: 56,
    chatWidth: 350,
    chatHeight: 500,
  },
  onChange,
}: AppearanceTabProps) {
  const handleChange = (key: keyof WidgetAppearance, value: any) => {
    onChange({ ...appearance, [key]: value });
  };

  // State for theme mode tabs
  const [themeMode, setThemeMode] = useState("basic");
  const [customThemeActive, setCustomThemeActive] = useState(false);
  const [previewTheme, setPreviewTheme] = useState(appearance.theme || "light");

  // Predefined themes
  const predefinedThemes = [
    { name: "Ocean Blue", primary: "#3B82F6", secondary: "#EFF6FF" },
    { name: "Forest Green", primary: "#10B981", secondary: "#ECFDF5" },
    { name: "Royal Purple", primary: "#8B5CF6", secondary: "#F5F3FF" },
    { name: "Ruby Red", primary: "#EF4444", secondary: "#FEF2F2" },
  ];

  // Apply predefined theme
  const applyPredefinedTheme = (theme: {
    primary: string;
    secondary: string;
  }) => {
    handleChange("primaryColor", theme.primary);
    handleChange("secondaryColor", theme.secondary);
  };

  // Generate AI theme
  const generateAITheme = () => {
    // Simulate AI theme generation
    const randomTheme =
      predefinedThemes[Math.floor(Math.random() * predefinedThemes.length)];
    applyPredefinedTheme(randomTheme);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Theme</h3>
        </div>

        <Tabs
          value={themeMode}
          onValueChange={(value: any) => setThemeMode(value)}
          className="w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="flex items-center gap-1">
              <Sun className="h-3.5 w-3.5" />
              Basic
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-1">
              <Palette className="h-3.5 w-3.5" />
              Advanced
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-1">
              <Wand2 className="h-3.5 w-3.5" />
              AI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="theme">Widget Theme</Label>
              <Select
                value={appearance.theme}
                onValueChange={(value) => {
                  handleChange("theme", value);
                  setPreviewTheme(value);
                }}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      System (Auto)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="custom-theme">Custom Theme</Label>
                <Switch
                  id="custom-theme"
                  checked={customThemeActive}
                  onCheckedChange={setCustomThemeActive}
                />
              </div>
              {customThemeActive && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {predefinedThemes.map((theme, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-2 p-2 hover:border-primary"
                      onClick={() => applyPredefinedTheme(theme)}
                    >
                      <div className="flex gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      </div>
                      <span className="text-xs">{theme.name}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-4 space-y-4">
            <div className="grid gap-4">
              <div>
                <Label className="mb-2 block">Theme Preview</Label>
                <div
                  id="theme-preview"
                  className="p-4 rounded-md border"
                  style={{
                    backgroundColor:
                      previewTheme === "dark" ? "#1F2937" : "#FFFFFF",
                    color: previewTheme === "dark" ? "#F9FAFB" : "#111827",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: appearance.primaryColor }}
                    />
                    <div className="font-medium">{appearance.headerText}</div>
                  </div>
                  <div
                    className="p-2 rounded-md mb-2"
                    style={{
                      backgroundColor: appearance.secondaryColor,
                      color: previewTheme === "dark" ? "#F9FAFB" : "#111827",
                      borderRadius: `${appearance.borderRadius}px`,
                    }}
                  >
                    {appearance.welcomeMessage}
                  </div>
                  <div
                    className="p-2 rounded-md ml-auto w-3/4"
                    style={{
                      backgroundColor: appearance.primaryColor,
                      color: "#FFFFFF",
                      borderRadius: `${appearance.borderRadius}px`,
                    }}
                  >
                    Sample response message
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="light-mode">Light Mode</Label>
                  <Button
                    id="light-mode"
                    variant={previewTheme === "light" ? "default" : "outline"}
                    className="w-full mt-1 justify-start gap-2"
                    onClick={() => {
                      handleChange("theme", "light");
                      setPreviewTheme("light");
                    }}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                </div>
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Button
                    id="dark-mode"
                    variant={previewTheme === "dark" ? "default" : "outline"}
                    className="w-full mt-1 justify-start gap-2"
                    onClick={() => {
                      handleChange("theme", "dark");
                      setPreviewTheme("dark");
                    }}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-4 space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h4 className="font-medium">AI Theme Generator</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Let AI generate a perfect color scheme for your chat widget
                based on your brand and audience preferences.
              </p>
              <Button onClick={generateAITheme} className="w-full gap-2">
                <Wand2 className="h-4 w-4" />
                Generate AI Theme
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Colors</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: appearance.primaryColor }}
              />
              <Input
                id="primary-color"
                type="color"
                value={appearance.primaryColor}
                onChange={(e) => handleChange("primaryColor", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: appearance.secondaryColor }}
              />
              <Input
                id="secondary-color"
                type="color"
                value={appearance.secondaryColor}
                onChange={(e) => handleChange("secondaryColor", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Typography</h3>
        <div className="grid gap-2">
          <Label htmlFor="font-family">Font Family</Label>
          <Select
            value={appearance.fontFamily}
            onValueChange={(value) => handleChange("fontFamily", value)}
          >
            <SelectTrigger id="font-family">
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Open Sans">Open Sans</SelectItem>
              <SelectItem value="Lato">Lato</SelectItem>
              <SelectItem value="Poppins">Poppins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Border Radius</h3>
          <span className="text-sm text-muted-foreground">
            {appearance.borderRadius}px
          </span>
        </div>
        <Slider
          value={[appearance.borderRadius]}
          min={0}
          max={20}
          step={1}
          onValueChange={(value) => handleChange("borderRadius", value[0])}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Chat Icon Size</h3>
          <span className="text-sm text-muted-foreground">
            {appearance.chatIconSize}px
          </span>
        </div>
        <Slider
          value={[appearance.chatIconSize || 56]}
          min={40}
          max={80}
          step={4}
          onValueChange={(value) => handleChange("chatIconSize", value[0])}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Icon Settings</h3>
        <div className="grid gap-2">
          <Label htmlFor="icon-type">Icon Type</Label>
          <Select
            id="icon-type"
            value={appearance.iconType || "chat"}
            onValueChange={(value: "chat" | "message" | "help" | "custom") =>
              handleChange("iconType", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chat">Chat Bubble</SelectItem>
              <SelectItem value="message">Message</SelectItem>
              <SelectItem value="help">Help</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(appearance.iconType === "custom" ||
          appearance.iconType === undefined) && (
          <div className="grid gap-2">
            <Label htmlFor="custom-icon">Custom Icon URL</Label>
            <Input
              id="custom-icon"
              value={appearance.customIcon || ""}
              onChange={(e) => handleChange("customIcon", e.target.value)}
              placeholder="https://example.com/icon.svg"
              className="h-10"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Position</h3>
        <RadioGroup
          value={appearance.position}
          onValueChange={(value: any) => handleChange("position", value)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bottom-right" id="bottom-right" />
            <Label htmlFor="bottom-right">Bottom Right</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bottom-left" id="bottom-left" />
            <Label htmlFor="bottom-left">Bottom Left</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="top-right" id="top-right" />
            <Label htmlFor="top-right">Top Right</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="top-left" id="top-left" />
            <Label htmlFor="top-left">Top Left</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Text Content</h3>
            <Type className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="header-text" className="flex items-center gap-2">
              Header Text
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The title shown at the top of your chat widget</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="header-text"
              value={appearance.headerText}
              onChange={(e) => handleChange("headerText", e.target.value)}
              placeholder="Chat with us"
              className="h-10"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="welcome-message"
              className="flex items-center gap-2"
            >
              Welcome Message
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The first message users see when opening the chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="welcome-message"
              value={appearance.welcomeMessage}
              onChange={(e) => handleChange("welcomeMessage", e.target.value)}
              placeholder="Hello! How can I help you today?"
              className="h-10"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t mt-8">
        <Button variant="outline" className="mr-2" type="button">
          Reset Changes
        </Button>
        <Button className="gap-2" type="button">
          <Check className="h-4 w-4" />
          Save Appearance
        </Button>
      </div>
    </div>
  );
}

// Helper function to get position classes based on the widget position setting
const getPositionClasses = (position: string) => {
  switch (position) {
    case "bottom-right":
      return "bottom-2 right-2";
    case "bottom-left":
      return "bottom-2 left-2";
    case "top-right":
      return "top-2 right-2";
    case "top-left":
      return "top-2 left-2";
    default:
      return "bottom-2 right-2";
  }
};
