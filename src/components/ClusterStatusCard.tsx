import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import type { DashboardOverview } from '@/types/dashboard';
import type { Status } from '@/types/status';

interface ClusterStatusCardProps {
  cluster: DashboardOverview['cluster'];
}

export function ClusterStatusCard({ cluster }: ClusterStatusCardProps) {
  return (
    <Card className="ks-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cluster Status</CardTitle>
        <StatusBadge status={cluster.status as Status} />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm text-zinc-400">
          Cluster:
          <span className="ml-2 text-zinc-100">{cluster.name}</span>
        </div>

        <div className="text-sm text-zinc-400">
          Kubernetes version:
          <span className="ml-2 text-zinc-100">{cluster.version}</span>
        </div>
      </CardContent>
    </Card>
  );
}
