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
        <WidgetListEmpty onCreateWidget={onCreateWidget} />
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
