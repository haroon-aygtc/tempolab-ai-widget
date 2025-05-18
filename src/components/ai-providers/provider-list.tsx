import { AIProvider } from "@/types";
import { ProviderCard } from "./provider-card";

interface ProviderListProps {
  providers: AIProvider[];
  onConfigureProvider: (provider: AIProvider) => void;
}

export function ProviderList({
  providers,
  onConfigureProvider,
}: ProviderListProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">AI Providers</h2>
        <p className="text-muted-foreground mt-1">
          Configure your AI providers to power your chat widgets
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onConfigure={onConfigureProvider}
          />
        ))}
      </div>
    </div>
  );
}
