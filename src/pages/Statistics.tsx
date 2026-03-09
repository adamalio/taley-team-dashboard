import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, CheckSquare, Clock, Target } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart,
} from "recharts";

const weeklyData = [
  { name: "Mo", aufgaben: 8, erledigt: 6 },
  { name: "Di", aufgaben: 12, erledigt: 10 },
  { name: "Mi", aufgaben: 6, erledigt: 5 },
  { name: "Do", aufgaben: 15, erledigt: 12 },
  { name: "Fr", aufgaben: 10, erledigt: 9 },
  { name: "Sa", aufgaben: 3, erledigt: 3 },
  { name: "So", aufgaben: 1, erledigt: 1 },
];

const monthlyTrend = [
  { name: "Jan", tasks: 45 }, { name: "Feb", tasks: 52 }, { name: "Mär", tasks: 68 },
  { name: "Apr", tasks: 61 }, { name: "Mai", tasks: 75 }, { name: "Jun", tasks: 82 },
];

const projectDistribution = [
  { name: "Website Relaunch", value: 35, color: "hsl(149, 46%, 56%)" },
  { name: "Mobile App v2", value: 28, color: "hsl(14, 74%, 66%)" },
  { name: "API Migration", value: 22, color: "hsl(47, 95%, 56%)" },
  { name: "Sonstiges", value: 15, color: "hsl(155, 52%, 34%)" },
];

const teamPerformance = [
  { name: "Anna M.", initials: "AM", completed: 24, total: 28, role: "Designer" },
  { name: "Max K.", initials: "MK", completed: 31, total: 35, role: "Backend Dev" },
  { name: "Tom B.", initials: "TB", completed: 18, total: 22, role: "Frontend Dev" },
  { name: "Sarah L.", initials: "SL", completed: 15, total: 20, role: "PM" },
  { name: "Lisa W.", initials: "LW", completed: 12, total: 15, role: "QA" },
];

const summaryStats = [
  { label: "Erledigte Aufgaben", value: "156", change: "+12%", icon: CheckSquare },
  { label: "Durchschnittl. Zeit", value: "2.4 Tage", change: "-8%", icon: Clock },
  { label: "Team-Produktivität", value: "87%", change: "+5%", icon: TrendingUp },
  { label: "Aktive Projekte", value: "4", change: "0", icon: Target },
];

const Statistics = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Statistiken</h1>
      <p className="text-muted-foreground">Analysiere Teamleistung und Projektfortschritt.</p>
    </div>

    {/* Summary Stats */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryStats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <Badge variant={stat.change.startsWith("+") ? "default" : "secondary"} className="text-[10px] h-4">
                  {stat.change}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Weekly Tasks Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Wöchentliche Aufgaben
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(187, 30%, 40%)' }} />
              <YAxis className="text-xs" tick={{ fill: 'hsl(187, 30%, 40%)' }} />
              <Tooltip contentStyle={{ background: 'hsl(0, 0%, 100%)', border: '1px solid hsl(155, 20%, 88%)', borderRadius: '8px' }} />
              <Bar dataKey="aufgaben" fill="hsl(149, 46%, 56%)" radius={[4, 4, 0, 0]} name="Erstellt" />
              <Bar dataKey="erledigt" fill="hsl(155, 52%, 34%)" radius={[4, 4, 0, 0]} name="Erledigt" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Monatlicher Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(187, 30%, 40%)' }} />
              <YAxis tick={{ fill: 'hsl(187, 30%, 40%)' }} />
              <Tooltip contentStyle={{ background: 'hsl(0, 0%, 100%)', border: '1px solid hsl(155, 20%, 88%)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="tasks" stroke="hsl(149, 46%, 56%)" fill="hsl(149, 46%, 56%)" fillOpacity={0.2} name="Aufgaben" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Projektverteilung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={projectDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {projectDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {projectDistribution.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="text-sm flex-1">{p.name}</span>
                  <span className="text-sm font-semibold">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamPerformance.map((member) => (
            <div key={member.name} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">{member.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{member.name}</span>
                  <span className="text-xs text-muted-foreground">{member.completed}/{member.total}</span>
                </div>
                <Progress value={(member.completed / member.total) * 100} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Statistics;
