import { Widget } from "@/types";
import { MessageSquare, X, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface WidgetPreviewProps {
  widget: Widget;
}

export function WidgetPreview({ widget }: WidgetPreviewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [],
  );

  const { appearance, behavior } = widget;

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, { text: message, isUser: true }]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "This is a simulated response from the AI assistant.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  const getPositionClasses = () => {
    switch (appearance.position) {
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

  return (
    <div className="relative h-full w-full bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
      <div className="absolute w-full h-full bg-grid-pattern opacity-10" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="flex flex-col items-end">
          {!isOpen && (
            <Button
              onClick={() => setIsOpen(true)}
              style={{ backgroundColor: appearance.primaryColor }}
              className="rounded-full h-14 w-14 flex items-center justify-center shadow-lg"
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </Button>
          )}

          {isOpen && (
            <div
              className="w-80 h-96 flex flex-col rounded-lg shadow-lg overflow-hidden"
              style={{
                borderRadius: `${appearance.borderRadius}px`,
                fontFamily: appearance.fontFamily || "Inter",
                backgroundColor:
                  appearance.theme === "dark" ? "#1f2937" : "white",
                color: appearance.theme === "dark" ? "white" : "#1f2937",
              }}
            >
              <div
                className="flex items-center justify-between p-3"
                style={{ backgroundColor: appearance.primaryColor }}
              >
                <h3 className="font-medium text-white">
                  {appearance.headerText}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.length === 0 && (
                  <div
                    className="text-sm"
                    style={{
                      color:
                        appearance.theme === "dark" ? "#e5e7eb" : "#4b5563",
                    }}
                  >
                    {appearance.welcomeMessage}
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        msg.isUser
                          ? "bg-primary text-primary-foreground"
                          : appearance.theme === "dark"
                            ? "bg-gray-700 text-gray-100"
                            : "bg-gray-100 text-gray-800"
                      }`}
                      style={{
                        backgroundColor: msg.isUser
                          ? appearance.primaryColor
                          : undefined,
                        color: msg.isUser ? "white" : undefined,
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="p-3 border-t"
                style={{
                  borderColor:
                    appearance.theme === "dark" ? "#374151" : "#e5e7eb",
                }}
              >
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                    style={{
                      backgroundColor:
                        appearance.theme === "dark" ? "#374151" : "white",
                      color: appearance.theme === "dark" ? "white" : "#1f2937",
                      borderColor:
                        appearance.theme === "dark" ? "#4b5563" : "#e5e7eb",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  {behavior.allowAttachments && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    onClick={handleSendMessage}
                    style={{ backgroundColor: appearance.primaryColor }}
                    className="flex-shrink-0"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {behavior.showBranding && (
                  <div className="text-xs text-center mt-2 text-muted-foreground">
                    Powered by ChatEmbed
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
