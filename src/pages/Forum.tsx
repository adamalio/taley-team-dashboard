import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, MessageCircle, ThumbsUp, Eye, Pin } from "lucide-react";

const categories = [
  { name: "Alle", count: 15 },
  { name: "Allgemein", count: 5 },
  { name: "Technisch", count: 4 },
  { name: "Design", count: 3 },
  { name: "Ideen", count: 3 },
];

const threads = [
  { id: 1, title: "Vorschlag: Neue Meeting-Struktur", author: "Sarah L.", initials: "SL", category: "Allgemein", replies: 12, likes: 8, views: 45, pinned: true, time: "Vor 2 Std.", preview: "Ich würde vorschlagen, unsere wöchentlichen Meetings umzustrukturieren..." },
  { id: 2, title: "Best Practices für Code Reviews", author: "Max K.", initials: "MK", category: "Technisch", replies: 18, likes: 15, views: 72, pinned: true, time: "Vor 5 Std.", preview: "Hier sind einige Guidelines, die ich aus unseren letzten Sprints gelernt habe..." },
  { id: 3, title: "Neue Farbpalette für Dashboard", author: "Anna M.", initials: "AM", category: "Design", replies: 7, likes: 11, views: 38, pinned: false, time: "Gestern", preview: "Ich habe ein paar Varianten erstellt, die besser zum Branding passen..." },
  { id: 4, title: "Feature Request: Dark Mode Toggle", author: "Tom B.", initials: "TB", category: "Ideen", replies: 22, likes: 19, views: 89, pinned: false, time: "Gestern", preview: "Wäre es möglich, einen schnellen Dark Mode Toggle in der TopBar hinzuzufügen?" },
  { id: 5, title: "Deployment Pipeline Optimierung", author: "Max K.", initials: "MK", category: "Technisch", replies: 9, likes: 6, views: 31, pinned: false, time: "Vor 2 Tagen", preview: "Unsere CI/CD Pipeline dauert aktuell zu lange. Hier meine Vorschläge..." },
  { id: 6, title: "Team-Event Vorschläge für Q2", author: "Lisa W.", initials: "LW", category: "Allgemein", replies: 14, likes: 10, views: 56, pinned: false, time: "Vor 3 Tagen", preview: "Lasst uns Ideen sammeln für unser nächstes Team-Event!" },
  { id: 7, title: "Wireframes für Mobile App v2", author: "Anna M.", initials: "AM", category: "Design", replies: 5, likes: 7, views: 29, pinned: false, time: "Letzte Woche", preview: "Hier sind die ersten Wireframes für die neue Mobile App Version..." },
];

const Forum = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Forum</h1>
        <p className="text-muted-foreground">Diskutiere Themen und Ideen mit deinem Team.</p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Neues Thema
      </Button>
    </div>

    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Themen suchen..." className="pl-9" />
    </div>

    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <Badge key={cat.name} variant="secondary" className="cursor-pointer hover:bg-accent transition-colors px-3 py-1">
          {cat.name} <span className="ml-1 text-muted-foreground">({cat.count})</span>
        </Badge>
      ))}
    </div>

    <div className="space-y-3">
      {threads.map((thread) => (
        <Card key={thread.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 mt-1 hidden sm:flex">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">{thread.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {thread.pinned && <Pin className="h-3.5 w-3.5 text-primary shrink-0" />}
                  <h3 className="text-sm font-semibold">{thread.title}</h3>
                  <Badge variant="outline" className="text-[10px] shrink-0">{thread.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{thread.preview}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{thread.author}</span>
                  <span>{thread.time}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{thread.replies}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{thread.likes}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{thread.views}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Forum;
