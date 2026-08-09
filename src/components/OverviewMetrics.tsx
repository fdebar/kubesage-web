import { Activity, Server, ShieldAlert, Box } from '@/lib/icons';
import { MetricCard } from '@/components/common/MetricCard';
import type { DashboardOverview } from '@/types/dashboard';

interface OverviewMetricsProps {
  overview: DashboardOverview;
}

export function OverviewMetrics({ overview }: OverviewMetricsProps) {
  const metrics = overview.metrics;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Pods"
        value={metrics.pods.toString()}
        icon={Box}
        description="Running workloads"
      />

      <MetricCard
        title="Nodes"
        value={metrics.nodes.toString()}
        icon={Server}
        description="Cluster capacity"
      />

      <MetricCard
        title="Findings"
        value={metrics.findings.toString()}
        icon={ShieldAlert}
        description="Detected issues"
      />

      <MetricCard
        title="Health Score"
        value={`${metrics.health_score}%`}
        icon={Activity}
        description="Overall cluster health"
      />
    </div>
  );
}
