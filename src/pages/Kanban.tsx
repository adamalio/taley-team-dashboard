import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Calendar, MessageCircle, Paperclip } from "lucide-react";

interface KanbanCard {
  id: number;
  title: string;
  description?: string;
  assignees: { initials: string }[];
  priority: "high" | "medium" | "low";
  dueDate?: string;
  comments: number;
  attachments: number;
  labels: { name: string; color: string }[];
}

interface KanbanColumn {
  title: string;
  color: string;
  cards: KanbanCard[];
}

const columns: KanbanColumn[] = [
  {
    title: "Backlog",
    color: "bg-muted-foreground",
    cards: [
      { id: 1, title: "User Research durchführen", description: "Interviews mit 10 Nutzern planen", assignees: [{ initials: "SL" }], priority: "medium", dueDate: "20. Mär", comments: 2, attachments: 0, labels: [{ name: "Research", color: "bg-[hsl(var(--taley-gold))]/20 text-[hsl(var(--taley-gold))]" }] },
      { id: 2, title: "Wettbewerbsanalyse", assignees: [{ initials: "LW" }], priority: "low", comments: 0, attachments: 1, labels: [{ name: "Strategie", color: "bg-primary/20 text-primary" }] },
    ],
  },
  {
    title: "To Do",
    color: "bg-[hsl(var(--taley-coral))]",
    cards: [
      { id: 3, title: "Push Notifications", description: "FCM Integration für iOS & Android", assignees: [{ initials: "TB" }], priority: "high", dueDate: "16. Mär", comments: 5, attachments: 2, labels: [{ name: "Feature", color: "bg-primary/20 text-primary" }] },
      { id: 4, title: "API Docs schreiben", assignees: [{ initials: "MK" }], priority: "medium", dueDate: "14. Mär", comments: 1, attachments: 0, labels: [{ name: "Docs", color: "bg-[hsl(var(--taley-forest))]/20 text-[hsl(var(--taley-forest))]" }] },
      { id: 5, title: "E2E Tests erweitern", assignees: [{ initials: "TB" }, { initials: "MK" }], priority: "medium", comments: 3, attachments: 0, labels: [{ name: "Testing", color: "bg-[hsl(var(--taley-peach))]/20 text-[hsl(var(--taley-coral))]" }] },
    ],
  },
  {
    title: "In Bearbeitung",
    color: "bg-[hsl(var(--taley-gold))]",
    cards: [
      { id: 6, title: "Landing Page Design", description: "Hero Section und Feature Cards", assignees: [{ initials: "AM" }], priority: "high", dueDate: "12. Mär", comments: 8, attachments: 4, labels: [{ name: "Design", color: "bg-[hsl(var(--taley-coral))]/20 text-[hsl(var(--taley-coral))]" }] },
      { id: 7, title: "Onboarding Flow", assignees: [{ initials: "SL" }, { initials: "AM" }], priority: "medium", dueDate: "15. Mär", comments: 4, attachments: 1, labels: [{ name: "UX", color: "bg-[hsl(var(--taley-gold))]/20 text-[hsl(var(--taley-gold))]" }] },
    ],
  },
  {
    title: "Review",
    color: "bg-primary",
    cards: [
      { id: 8, title: "DB Schema Optimierung", assignees: [{ initials: "MK" }], priority: "low", comments: 2, attachments: 0, labels: [{ name: "Backend", color: "bg-primary/20 text-primary" }] },
    ],
  },
  {
    title: "Erledigt",
    color: "bg-[hsl(var(--taley-forest))]",
    cards: [
      { id: 9, title: "User Feedback analysiert", assignees: [{ initials: "LW" }], priority: "medium", comments: 6, attachments: 3, labels: [{ name: "Research", color: "bg-[hsl(var(--taley-gold))]/20 text-[hsl(var(--taley-gold))]" }] },
    ],
  },
];

const priorityDot: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-[hsl(var(--taley-gold))]",
  low: "bg-muted-foreground",
};

const KanbanCardComponent = ({ card }: { card: KanbanCard }) => (
  <Card className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
    <CardContent className="p-3 space-y-3">
      {card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {card.labels.map((l) => (
            <span key={l.name} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${l.color}`}>
              {l.name}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-start gap-2">
        <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${priorityDot[card.priority]}`} />
        <p className="text-sm font-medium leading-snug">{card.title}</p>
      </div>
      {card.description && (
        <p className="text-xs text-muted-foreground">{card.description}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-muted-foreground">
          {card.comments > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <MessageCircle className="h-3 w-3" />{card.comments}
            </span>
          )}
          {card.attachments > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <Paperclip className="h-3 w-3" />{card.attachments}
            </span>
          )}
          {card.dueDate && (
            <span className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />{card.dueDate}
            </span>
          )}
        </div>
        <div className="flex -space-x-1.5">
          {card.assignees.map((a, i) => (
            <Avatar key={i} className="h-6 w-6 border-2 border-card">
              <AvatarFallback className="bg-primary/10 text-primary text-[9px]">{a.initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const Kanban = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
        <p className="text-muted-foreground">Visualisiere deine Aufgaben auf dem Kanban Board.</p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Neue Karte
      </Button>
    </div>

    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div key={col.title} className="flex-shrink-0 w-72">
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <Badge variant="secondary" className="text-xs ml-auto">{col.cards.length}</Badge>
          </div>
          <div className="space-y-3">
            {col.cards.map((card) => (
              <KanbanCardComponent key={card.id} card={card} />
            ))}
            <Button variant="ghost" className="w-full justify-start text-muted-foreground text-sm">
              <Plus className="h-4 w-4 mr-2" />
              Karte hinzufügen
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Kanban;
