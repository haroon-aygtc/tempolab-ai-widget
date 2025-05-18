import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Check, X } from "lucide-react";
import { AIProvider } from "@/types";

interface ProviderCardProps {
  provider: AIProvider;
  onConfigure: (provider: AIProvider) => void;
}

export function ProviderCard({ provider, onConfigure }: ProviderCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={provider.logo}
              alt={`${provider.name} logo`}
              className="h-8 w-8 rounded-md object-contain"
            />
            <CardTitle>{provider.name}</CardTitle>
          </div>
          <Badge variant={provider.isConfigured ? "default" : "outline"}>
            {provider.isConfigured ? "Configured" : "Not Configured"}
          </Badge>
        </div>
        <CardDescription>{provider.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">API Key Required:</span>
            {provider.apiKeyRequired ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="text-sm">
            <span className="font-medium">Available Models:</span>{" "}
            <span className="text-muted-foreground">
              {provider.models.length > 0
                ? provider.models.map((model) => model.name).join(", ")
                : "None"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <Button
          onClick={() => onConfigure(provider)}
          variant={provider.isConfigured ? "outline" : "default"}
          className="w-full"
        >
          <Edit className="mr-2 h-4 w-4" />
          {provider.isConfigured ? "Edit Configuration" : "Configure"}
        </Button>
      </CardFooter>
    </Card>
  );
}
