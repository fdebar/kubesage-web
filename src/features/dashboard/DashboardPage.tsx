import { useDashboard } from '@/hooks/useDashboard';
import { PageHeader } from '@/components/common/PageHeader';
import { OverviewMetrics } from '@/components/OverviewMetrics';
import { ClusterStatusCard } from '@/components/ClusterStatusCard';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';
import { SeveritySummaryCard } from '@/components/SeveritySummaryCard';

export function DashboardPage() {
  const { data: overview, isLoading, isFetching, error } = useDashboard();

  if (isLoading) return <LoadingState />;
  if (error) {
    return <EmptyState title="Unable to load dashboard" description="API unavailable" />;
  }
  if (!overview) {
    return <EmptyState title="No Data" description="No dashboard data found" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={isFetching ? 'Refreshing...' : 'Kubernetes observability overview'}
      />
      <OverviewMetrics overview={overview} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ClusterStatusCard cluster={overview.cluster} />
        <SeveritySummaryCard severities={overview.severities} />
      </div>
    </div>
  );
}
