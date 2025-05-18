import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EmbedCodeGenerator } from "@/components/embed-code/embed-code-generator";
import { Widget } from "@/types";

// Mock data for demonstration
const mockWidgets: Widget[] = [
  {
    id: "widget-1",
    name: "Customer Support",
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 6, 20),
    appearance: {
      theme: "light",
      primaryColor: "#4f46e5",
      fontFamily: "Inter",
      borderRadius: 8,
      position: "bottom-right",
      iconType: "chat",
      headerText: "Customer Support",
      welcomeMessage:
        "Hello! How can I help you today? I'm here to answer any questions about our products and services.",
    },
    behavior: {
      autoOpen: false,
      autoOpenDelay: 5,
      persistHistory: true,
      showBranding: true,
      allowAttachments: true,
      requireUserInfo: true,
      collectEmailBeforeChat: true,
      collectNameBeforeChat: false,
    },
    aiConfig: {
      providerId: "gemini",
      modelId: "gemini-pro",
      systemPrompt:
        "You are a helpful customer support assistant for our company. Be friendly, concise, and helpful. If you don't know something, say so and offer to connect the customer with a human agent.",
      fallbackMessage:
        "I'm sorry, I couldn't understand that. Could you rephrase or provide more details?",
      maxTokens: 1000,
      temperature: 0.7,
    },
  },
  {
    id: "widget-2",
    name: "Sales Assistant",
    createdAt: new Date(2023, 7, 10),
    updatedAt: new Date(2023, 8, 5),
    appearance: {
      theme: "dark",
      primaryColor: "#10b981",
      fontFamily: "Poppins",
      borderRadius: 12,
      position: "bottom-left",
      iconType: "message",
      headerText: "Sales Assistant",
      welcomeMessage:
        "Hi there! I'm your personal sales assistant. I can help you find the perfect product for your needs and answer any questions about pricing or features.",
    },
    behavior: {
      autoOpen: true,
      autoOpenDelay: 10,
      persistHistory: false,
      showBranding: false,
      allowAttachments: false,
      requireUserInfo: true,
      collectEmailBeforeChat: true,
      collectNameBeforeChat: true,
    },
    aiConfig: {
      providerId: "mistral",
      modelId: "mistral-medium",
      systemPrompt:
        "You are a sales assistant for our company. Help customers find the right products, explain features, and provide pricing information. Be persuasive but honest, and focus on understanding customer needs before making recommendations.",
      fallbackMessage:
        "I didn't quite catch that. Could you please rephrase your question?",
      maxTokens: 1500,
      temperature: 0.8,
    },
  },
];

export default function EmbedCodePage() {
  const [widgets] = useState<Widget[]>(mockWidgets);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Embed Code Generator</h1>
          <p className="text-muted-foreground">
            Generate code to embed your chat widget on any website
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmbedCodeGenerator widgets={widgets} />

          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Implementation Guide
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">1. Copy the embed code</h3>
                  <p className="text-sm text-muted-foreground">
                    Select your widget and copy the generated code snippet.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">2. Paste into your website</h3>
                  <p className="text-sm text-muted-foreground">
                    Add the code to your website's HTML, just before the closing
                    &lt;/body&gt; tag.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">3. Test your widget</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit your website to ensure the chat widget appears and
                    functions correctly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Advanced Integration
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Custom Initialization</h3>
                  <p className="text-sm text-muted-foreground">
                    You can pass additional options when initializing the
                    widget:
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                    {`cw('init', {
  widgetId: 'widget-1',
  userData: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium">JavaScript API</h3>
                  <p className="text-sm text-muted-foreground">
                    Control the widget programmatically using our JavaScript
                    API:
                  </p>
                  <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                    {`// Open the widget
cw('open');

// Close the widget
cw('close');

// Send a message programmatically
cw('sendMessage', 'Hello from my website!');`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
