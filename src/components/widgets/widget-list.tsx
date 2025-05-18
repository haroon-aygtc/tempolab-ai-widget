import { Widget } from "@/types";
import { WidgetCard } from "./widget-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WidgetListProps {
  widgets: Widget[];
  onCreateWidget: () => void;
  onEditWidget: (widget: Widget) => void;
  onDeleteWidget: (widget: Widget) => void;
  onCopyEmbed: (widget: Widget) => void;
}

export function WidgetList({
  widgets,
  onCreateWidget,
  onEditWidget,
  onDeleteWidget,
  onCopyEmbed,
}: WidgetListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Chat Widgets</h2>
        <Button onClick={onCreateWidget}>
          <Plus className="mr-2 h-4 w-4" />
          Create Widget
        </Button>
      </div>

      {widgets.length === 0 ? (
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
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {widgets.map((widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              onEdit={onEditWidget}
              onDelete={onDeleteWidget}
              onCopyEmbed={onCopyEmbed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
