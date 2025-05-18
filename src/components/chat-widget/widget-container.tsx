import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface WidgetContainerProps {
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  botName?: string;
  botAvatar?: string;
  welcomeMessage?: string;
  placeholderText?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  width?: number;
  height?: number;
  isOpen?: boolean;
  onSendMessage?: (message: string) => Promise<string>;
}

const WidgetContainer = ({
  title = "Chat Assistant",
  subtitle = "Ask me anything!",
  primaryColor = "#4f46e5",
  secondaryColor = "#ffffff",
  textColor = "#ffffff",
  botName = "AI Assistant",
  botAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=assistant",
  welcomeMessage = "Hello! How can I help you today?",
  placeholderText = "Type your message...",
  position = "bottom-right",
  width = 350,
  height = 500,
  isOpen: initialIsOpen = false,
  onSendMessage = async (message) =>
    `This is a default response to: "${message}". Configure an AI provider in the admin panel.`,
}: WidgetContainerProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: welcomeMessage,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await onSendMessage(inputValue);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 bg-background`}>
      {/* Chat button when closed */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={toggleWidget}
            style={{ backgroundColor: primaryColor, color: textColor }}
            className="rounded-full h-14 w-14 flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </Button>
        </motion.div>
      )}

      {/* Chat widget when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            style={{ width: `${width}px` }}
          >
            <Card className="overflow-hidden shadow-xl border-2">
              {/* Header */}
              <div
                style={{ backgroundColor: primaryColor, color: textColor }}
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={toggleMinimize}
              >
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={botAvatar} alt={botName} />
                    <AvatarFallback>{botName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm">{title}</h3>
                    <p className="text-xs opacity-80">{subtitle}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWidget();
                    }}
                  />
                </div>
              </div>

              {/* Chat body */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: height - 60 }} // Subtract header height
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ScrollArea
                      className="p-4"
                      style={{ height: `${height - 120}px` }}
                    >
                      <div className="flex flex-col space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.sender === "user"
                                  ? `bg-primary text-primary-foreground`
                                  : `bg-muted`
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <span className="text-xs opacity-70 block text-right mt-1">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                              <div className="flex space-x-2">
                                <div
                                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Input area */}
                    <div className="p-4 border-t flex items-center">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={placeholderText}
                        className="flex-1 mr-2"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendMessage}
                        size="icon"
                        style={{
                          backgroundColor: primaryColor,
                          color: textColor,
                        }}
                        disabled={isLoading || !inputValue.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WidgetContainer;
