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
import { Edit, Copy, Trash2, ExternalLink } from "lucide-react";
import { Widget } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface WidgetCardProps {
  widget: Widget;
  onEdit: (widget: Widget) => void;
  onDelete: (widget: Widget) => void;
  onCopyEmbed: (widget: Widget) => void;
}

export function WidgetCard({
  widget,
  onEdit,
  onDelete,
  onCopyEmbed,
}: WidgetCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{widget.name}</CardTitle>
          <Badge variant="outline" className="ml-2">
            {widget.aiConfig.providerId}
          </Badge>
        </div>
        <CardDescription>
          Updated {formatDistanceToNow(widget.updatedAt, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-2 text-sm">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: widget.appearance.primaryColor }}
          />
          <span>
            {widget.appearance.theme.charAt(0).toUpperCase() +
              widget.appearance.theme.slice(1)}{" "}
            theme
          </span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {widget.appearance.welcomeMessage.length > 100
            ? `${widget.appearance.welcomeMessage.substring(0, 100)}...`
            : widget.appearance.welcomeMessage}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(widget)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCopyEmbed(widget)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(widget)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
