import { StatsCard } from "./stats-card";
import { MessageSquare, Users, BarChart3, Zap } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Conversations"
        value="1,234"
        description="vs. previous 30 days"
        icon={<MessageSquare className="h-4 w-4" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Active Users"
        value="845"
        description="vs. previous 30 days"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: 5, isPositive: true }}
      />
      <StatsCard
        title="Avg. Response Time"
        value="1.2s"
        description="vs. previous 30 days"
        icon={<Zap className="h-4 w-4" />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title="Satisfaction Rate"
        value="94%"
        description="vs. previous 30 days"
        icon={<BarChart3 className="h-4 w-4" />}
        trend={{ value: 2, isPositive: true }}
      />
    </div>
  );
}
