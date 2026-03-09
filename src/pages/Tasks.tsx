import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Calendar, Flag, Filter } from "lucide-react";

type Priority = "high" | "medium" | "low";
type Status = "todo" | "progress" | "done";

interface Task {
  id: number;
  title: string;
  assignee: string;
  initials: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  project: string;
}

const tasks: Task[] = [
  { id: 1, title: "Landing Page Design fertigstellen", assignee: "Anna M.", initials: "AM", priority: "high", status: "progress", dueDate: "12. Mär", project: "Website Relaunch" },
  { id: 2, title: "API Endpoints dokumentieren", assignee: "Max K.", initials: "MK", priority: "medium", status: "todo", dueDate: "14. Mär", project: "API Migration" },
  { id: 3, title: "Unit Tests für Auth-Modul", assignee: "Tom B.", initials: "TB", priority: "high", status: "todo", dueDate: "13. Mär", project: "Mobile App v2" },
  { id: 4, title: "Onboarding Flow überarbeiten", assignee: "Sarah L.", initials: "SL", priority: "medium", status: "progress", dueDate: "15. Mär", project: "Website Relaunch" },
  { id: 5, title: "Datenbankschema optimieren", assignee: "Max K.", initials: "MK", priority: "low", status: "done", dueDate: "10. Mär", project: "API Migration" },
  { id: 6, title: "User Feedback analysieren", assignee: "Lisa W.", initials: "LW", priority: "medium", status: "done", dueDate: "09. Mär", project: "Mobile App v2" },
  { id: 7, title: "Push Notifications implementieren", assignee: "Tom B.", initials: "TB", priority: "high", status: "todo", dueDate: "16. Mär", project: "Mobile App v2" },
  { id: 8, title: "Vertrag für Freelancer vorbereiten", assignee: "Sarah L.", initials: "SL", priority: "low", status: "todo", dueDate: "18. Mär", project: "Allgemein" },
];

const priorityConfig: Record<Priority, { label: string; variant: "destructive" | "default" | "secondary" }> = {
  high: { label: "Hoch", variant: "destructive" },
  medium: { label: "Mittel", variant: "default" },
  low: { label: "Niedrig", variant: "secondary" },
};

const TaskRow = ({ task }: { task: Task }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group">
    <Checkbox checked={task.status === "done"} />
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-medium ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
        {task.title}
      </p>
      <p className="text-xs text-muted-foreground">{task.project}</p>
    </div>
    <Badge variant={priorityConfig[task.priority].variant} className="text-xs hidden sm:flex">
      <Flag className="h-3 w-3 mr-1" />
      {priorityConfig[task.priority].label}
    </Badge>
    <div className="flex items-center gap-1 text-xs text-muted-foreground hidden md:flex">
      <Calendar className="h-3 w-3" />
      {task.dueDate}
    </div>
    <Avatar className="h-7 w-7">
      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{task.initials}</AvatarFallback>
    </Avatar>
  </div>
);

const Tasks = () => {
  const [search, setSearch] = useState("");
  
  const filterTasks = (status: Status) =>
    tasks.filter((t) => t.status === status && t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aufgaben</h1>
          <p className="text-muted-foreground">Erstelle, verwalte und verfolge deine Aufgaben.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neue Aufgabe
        </Button>
      </div>

      <div className="flex gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Aufgaben suchen..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(var(--taley-gold))]/10">
              <Flag className="h-5 w-5 text-[hsl(var(--taley-gold))]" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tasks.filter((t) => t.status === "todo").length}</p>
              <p className="text-xs text-muted-foreground">Offen</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Flag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tasks.filter((t) => t.status === "progress").length}</p>
              <p className="text-xs text-muted-foreground">In Bearbeitung</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(var(--taley-forest))]/10">
              <Flag className="h-5 w-5 text-[hsl(var(--taley-forest))]" />
            </div>
            <div>
              <p className="text-2xl font-bold">{tasks.filter((t) => t.status === "done").length}</p>
              <p className="text-xs text-muted-foreground">Erledigt</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Alle</TabsTrigger>
          <TabsTrigger value="todo">Offen</TabsTrigger>
          <TabsTrigger value="progress">In Bearbeitung</TabsTrigger>
          <TabsTrigger value="done">Erledigt</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-2 divide-y divide-border">
              {tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase())).map((t) => <TaskRow key={t.id} task={t} />)}
            </CardContent>
          </Card>
        </TabsContent>
        {(["todo", "progress", "done"] as Status[]).map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <Card>
              <CardContent className="p-2 divide-y divide-border">
                {filterTasks(status).map((t) => <TaskRow key={t.id} task={t} />)}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Tasks;
