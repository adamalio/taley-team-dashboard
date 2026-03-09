import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckSquare, FolderOpen, MessageCircle, Users, TrendingUp, Clock, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Offene Aufgaben", value: "12", change: "+3 diese Woche", icon: CheckSquare, color: "text-primary" },
  { label: "Team-Ordner", value: "5", change: "2 neu geteilt", icon: FolderOpen, color: "text-[hsl(var(--taley-gold))]" },
  { label: "Nachrichten", value: "28", change: "8 ungelesen", icon: MessageCircle, color: "text-[hsl(var(--taley-coral))]" },
  { label: "Team-Mitglieder", value: "8", change: "Alle aktiv", icon: Users, color: "text-[hsl(var(--taley-forest))]" },
];

const activities = [
  { user: "Anna M.", initials: "AM", action: "hat eine Aufgabe abgeschlossen", task: "Landing Page Design", time: "Vor 5 Min." },
  { user: "Max K.", initials: "MK", action: "hat einen Kommentar hinterlassen", task: "API Integration", time: "Vor 15 Min." },
  { user: "Sarah L.", initials: "SL", action: "hat ein Dokument hochgeladen", task: "Projektbericht Q1", time: "Vor 30 Min." },
  { user: "Tom B.", initials: "TB", action: "hat eine neue Aufgabe erstellt", task: "Unit Tests schreiben", time: "Vor 1 Std." },
  { user: "Lisa W.", initials: "LW", action: "hat den Status aktualisiert", task: "Backend Refactoring", time: "Vor 2 Std." },
];

const projects = [
  { name: "Website Relaunch", progress: 72, tasks: 18, completed: 13 },
  { name: "Mobile App v2", progress: 45, tasks: 24, completed: 11 },
  { name: "API Migration", progress: 90, tasks: 10, completed: 9 },
];

const teamMembers = [
  { name: "Anna M.", initials: "AM", role: "Designer", status: "online" },
  { name: "Max K.", initials: "MK", role: "Backend Dev", status: "online" },
  { name: "Sarah L.", initials: "SL", role: "PM", status: "away" },
  { name: "Tom B.", initials: "TB", role: "Frontend Dev", status: "online" },
];

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Willkommen zurück! Hier ist dein Überblick.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3 text-primary" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Projects Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Projektfortschritt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {projects.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{project.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {project.completed}/{project.tasks} Aufgaben
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-sm font-semibold text-primary">{project.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card ${
                      member.status === "online" ? "bg-primary" : "bg-[hsl(var(--taley-gold))]"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Letzte Aktivitäten
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar className="h-8 w-8 mt-0.5">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {activity.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-sm font-medium text-primary">{activity.task}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
