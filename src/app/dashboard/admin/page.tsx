import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  CheckCircle,
  Clock3,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";

const statCards = [
  { title: "Active Students", value: "1,248", change: "+3.2%", icon: Users },
  { title: "Courses Live", value: "32", change: "Stable", icon: BookOpen },
  { title: "Placement Rate", value: "92%", change: "+1.1%", icon: ShieldCheck },
  { title: "Open Tickets", value: "12", change: "-5", icon: MessageSquare },
];

const sprints = [
  { name: "Backend Revamp", completion: 78 },
  { name: "UI Refresh", completion: 54 },
  { name: "Hiring Drive", completion: 36 },
];

const timeline = [
  {
    title: "Rahul Verma enrolled in MERN Bootcamp",
    time: "8 min ago",
    icon: CheckCircle,
  },
  {
    title: "Placement partner review scheduled",
    time: "32 min ago",
    icon: CalendarCheck,
  },
  {
    title: "New support ticket: Payment hold",
    time: "1 hr ago",
    icon: MessageSquare,
  },
  {
    title: "Weekly report generated",
    time: "2 hr ago",
    icon: BarChart3,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">This view is powered by dummy data.</p>
          <h2 className="text-xl font-semibold text-foreground">Control center</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Clock3 className="mr-2 h-4 w-4" />
            Last 24h
          </Button>
          <Button size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">{card.value}</span>
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                {card.change}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Health</p>
              <h3 className="text-lg font-semibold">Programs snapshot</h3>
            </div>
            <Badge variant="outline" className="border-emerald-400/40 bg-emerald-500/10 text-emerald-500">
              Live
            </Badge>
          </div>
          <div className="space-y-4">
            {sprints.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{item.name}</span>
                  <span className="font-semibold text-foreground">{item.completion}%</span>
                </div>
                <Progress value={item.completion} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Activity</p>
              <h3 className="text-lg font-semibold">Today</h3>
            </div>
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              Realtime
            </Badge>
          </div>
          <div className="space-y-3">
            {timeline.map((entry) => (
              <div
                key={entry.title}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-3"
              >
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <entry.icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{entry.title}</p>
                  <p className="text-xs text-muted-foreground">{entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
