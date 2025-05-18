import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";

interface WidgetListEmptyProps {
  onCreateWidget: () => void;
}

export function WidgetListEmpty({ onCreateWidget }: WidgetListEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <MessageSquare className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No widgets created yet</h3>
      <p className="mt-2 text-center text-sm text-muted-foreground max-w-sm">
        Create your first chat widget to start engaging with your website
        visitors using AI.
      </p>
      <Button onClick={onCreateWidget} className="mt-4">
        <Plus className="mr-2 h-4 w-4" />
        Create Your First Widget
      </Button>
    </div>
  );
}
