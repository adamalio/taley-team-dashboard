import { Bell, Search, Menu, Moon, Sun, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

const TopBar = ({ onMobileMenuToggle }: TopBarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const getUserInitials = () => {
    const name = profile?.full_name || user?.user_metadata?.full_name || user?.email || "";
    if (profile?.full_name || user?.user_metadata?.full_name) {
      const parts = name.split(" ");
      return parts.length >= 2 
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase() || "TU";
  };

  const getAvatarUrl = () => profile?.avatar_url || user?.user_metadata?.avatar_url;
  const getDisplayName = () => profile?.full_name || user?.user_metadata?.full_name || "Benutzer";

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMobileMenuToggle}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Suche..."
          className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* User avatar with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src={getAvatarUrl()} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">
                {getDisplayName()}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
