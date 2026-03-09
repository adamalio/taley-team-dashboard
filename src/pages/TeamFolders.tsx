import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FolderOpen, Plus, Search, Users, FileText, MoreVertical, Lock, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const folders = [
  { id: 1, name: "Marketing Kampagne Q1", files: 24, members: ["AM", "MK", "SL"], shared: true, updated: "Heute", color: "bg-primary/10" },
  { id: 2, name: "Design Assets", files: 56, members: ["AM", "LW"], shared: true, updated: "Gestern", color: "bg-[hsl(var(--taley-coral))]/10" },
  { id: 3, name: "Verträge & Dokumente", files: 12, members: ["SL"], shared: false, updated: "Vor 2 Tagen", color: "bg-[hsl(var(--taley-gold))]/10" },
  { id: 4, name: "Projektplanung 2024", files: 8, members: ["AM", "MK", "TB", "SL"], shared: true, updated: "Vor 3 Tagen", color: "bg-[hsl(var(--taley-forest))]/10" },
  { id: 5, name: "Onboarding Material", files: 15, members: ["LW", "TB"], shared: true, updated: "Letzte Woche", color: "bg-primary/10" },
  { id: 6, name: "Persönliche Notizen", files: 3, members: [], shared: false, updated: "Heute", color: "bg-[hsl(var(--taley-peach))]/10" },
];

const TeamFolders = () => {
  const [search, setSearch] = useState("");

  const filtered = folders.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team-Ordner</h1>
          <p className="text-muted-foreground">Verwalte deine Team-Ordner und freigegebene Dateien.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Ordner
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Ordner suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((folder) => (
          <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${folder.color}`}>
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Öffnen</DropdownMenuItem>
                    <DropdownMenuItem>Umbenennen</DropdownMenuItem>
                    <DropdownMenuItem>Teilen</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Löschen</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="font-semibold mb-1 truncate">{folder.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <FileText className="h-3.5 w-3.5" />
                <span>{folder.files} Dateien</span>
                <span>·</span>
                <span>{folder.updated}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {folder.members.slice(0, 3).map((m) => (
                    <Avatar key={m} className="h-7 w-7 border-2 border-card">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{m}</AvatarFallback>
                    </Avatar>
                  ))}
                  {folder.members.length > 3 && (
                    <Avatar className="h-7 w-7 border-2 border-card">
                      <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">
                        +{folder.members.length - 3}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <Badge variant={folder.shared ? "secondary" : "outline"} className="text-xs">
                  {folder.shared ? (
                    <><Globe className="h-3 w-3 mr-1" />Geteilt</>
                  ) : (
                    <><Lock className="h-3 w-3 mr-1" />Privat</>
                  )}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamFolders;
