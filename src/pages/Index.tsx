import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, FolderOpen, MessageCircle, Users } from "lucide-react";

const stats = [
  { label: "Offene Aufgaben", value: "12", icon: CheckSquare },
  { label: "Team-Ordner", value: "5", icon: FolderOpen },
  { label: "Nachrichten", value: "28", icon: MessageCircle },
  { label: "Team-Mitglieder", value: "8", icon: Users },
];

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Willkommen zurück! Hier ist dein Überblick.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Hier werden bald deine letzten Aktivitäten angezeigt.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
