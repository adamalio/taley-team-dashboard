import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  FolderOpen,
  CheckSquare,
  Columns3,
  MessageCircle,
  MessagesSquare,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import taleyLogo from "@/assets/taley-logo.png";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Profil", icon: User, path: "/profile" },
  { label: "Team-Ordner", icon: FolderOpen, path: "/folders" },
  { label: "Aufgaben", icon: CheckSquare, path: "/tasks" },
  { label: "Kanban", icon: Columns3, path: "/kanban" },
  { label: "Chat", icon: MessageCircle, path: "/chat" },
  { label: "Forum", icon: MessagesSquare, path: "/forum" },
  { label: "Statistiken", icon: BarChart3, path: "/dashboard" },
  { label: "Dokumente", icon: FileText, path: "/documents" },
  { label: "Einstellungen", icon: Settings, path: "/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src={taleyLogo} alt="Taley" className="h-10 w-10 object-contain" />
            <span className="text-lg font-bold text-foreground">Taley</span>
          </div>
        )}
        {collapsed && (
          <img src={taleyLogo} alt="Taley" className="mx-auto h-9 w-9 object-contain" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("h-7 w-7 text-sidebar-foreground hover:bg-sidebar-accent", collapsed && "hidden")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <div className="flex justify-center py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-7 w-7 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
