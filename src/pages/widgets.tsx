import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { WidgetList } from "@/components/widgets/widget-list";
import { WidgetForm } from "@/components/widget-designer/widget-form";
import { Widget, AIProvider } from "@/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MessageSquare } from "lucide-react";

// Mock data for demonstration
const mockProviders: AIProvider[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=gemini",
    description: "Google's advanced language model",
    isConfigured: true,
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
    description: "Efficient and powerful language models",
    isConfigured: true,
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
];

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
      enableVoiceInput: false,
      enableAnimation: true,
      animationType: "fade",
      autoResponse: false,
      autoResponseDelay: 3000,
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
      enableMemory: true,
      memoryWindow: 10,
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
      enableVoiceInput: true,
      enableAnimation: true,
      animationType: "slide",
      autoResponse: true,
      autoResponseDelay: 2000,
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
      enableMemory: true,
      memoryWindow: 15,
    },
  },
];

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<Widget[]>(mockWidgets);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentWidget, setCurrentWidget] = useState<Widget | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateWidget = () => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      name: "New Widget",
      createdAt: new Date(),
      updatedAt: new Date(),
      appearance: {
        theme: "light",
        primaryColor: "#4f46e5",
        fontFamily: "Inter",
        borderRadius: 8,
        position: "bottom-right",
        iconType: "chat",
        headerText: "Chat with us",
        welcomeMessage: "Hello! How can I help you today?",
      },
      behavior: {
        autoOpen: false,
        autoOpenDelay: 5,
        persistHistory: true,
        showBranding: true,
        allowAttachments: false,
        requireUserInfo: false,
        collectEmailBeforeChat: false,
        collectNameBeforeChat: false,
        enableVoiceInput: false,
        enableAnimation: true,
        animationType: "fade",
        autoResponse: false,
        autoResponseDelay: 3000,
      },
      aiConfig: {
        providerId: mockProviders[0].id,
        modelId: mockProviders[0].models[0].id,
        systemPrompt: "You are a helpful assistant for our company.",
        fallbackMessage:
          "I'm sorry, I couldn't understand that. Could you rephrase?",
        maxTokens: 1000,
        temperature: 0.7,
        enableMemory: true,
        memoryWindow: 10,
      },
    };

    setCurrentWidget(newWidget);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEditWidget = (widget: Widget) => {
    setCurrentWidget(widget);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDeleteWidget = (widget: Widget) => {
    setCurrentWidget(widget);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteWidget = () => {
    if (currentWidget) {
      setWidgets(widgets.filter((w) => w.id !== currentWidget.id));
      setIsDeleteDialogOpen(false);
      setCurrentWidget(null);
    }
  };

  const handleSaveWidget = (updatedWidget: Widget) => {
    if (isEditing) {
      setWidgets(
        widgets.map((w) => (w.id === updatedWidget.id ? updatedWidget : w)),
      );
    } else {
      setWidgets([...widgets, updatedWidget]);
    }
    setIsFormOpen(false);
    setCurrentWidget(null);
  };

  const handleCopyEmbed = (widget: Widget) => {
    const embedCode = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cw','https://chat-embed.example.com/widget.js'));
  cw('init', { widgetId: '${widget.id}' });
</script>`;

    navigator.clipboard.writeText(embedCode);
    // You could show a toast notification here
  };

  return (
    <DashboardLayout>
      <WidgetList
        widgets={widgets}
        onCreateWidget={handleCreateWidget}
        onEditWidget={handleEditWidget}
        onDeleteWidget={handleDeleteWidget}
        onCopyEmbed={handleCopyEmbed}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {currentWidget && (
            <WidgetForm
              widget={currentWidget}
              providers={mockProviders}
              onSave={handleSaveWidget}
              onCancel={() => setIsFormOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the "{currentWidget?.name}" widget
              and remove it from any websites where it's currently embedded.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteWidget}
              className="bg-destructive text-destructive-foreground"
            >
              Delete Widget
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
