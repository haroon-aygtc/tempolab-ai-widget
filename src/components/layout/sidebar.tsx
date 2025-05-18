import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Code,
  PanelLeft,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

function SidebarItem({ icon, label, href, isActive }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const routes = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Widgets",
      href: "/widgets",
    },
    {
      icon: <PanelLeft className="h-5 w-5" />,
      label: "AI Providers",
      href: "/ai-providers",
    },
    {
      icon: <Code className="h-5 w-5" />,
      label: "Embed Code",
      href: "/embed-code",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <aside className="fixed left-0 z-20 flex h-full w-64 flex-col border-r bg-card px-4 py-8">
      <div className="flex items-center gap-2 px-2">
        <MessageSquare className="h-6 w-6" />
        <h1 className="text-xl font-bold">ChatEmbed</h1>
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            isActive={pathname === route.href}
          />
        ))}
      </nav>
      <div className="border-t pt-4 mt-auto">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-medium text-primary-foreground">
              AE
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
