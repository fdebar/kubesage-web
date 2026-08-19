import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { FindingsSummary } from '@/features/findings/FindingsSummary';
import { FindingsTable } from './FindingsTable';
import { useFindings } from '@/hooks/useFindings';

export function FindingsPage() {
  const { data, isLoading, error } = useFindings();

  if (isLoading) return <LoadingState />;
  if (error)
    return (
      <EmptyState title="Unable to load findings" description="The findings API is unavailable" />
    );
  if (!data) return <EmptyState title="No Findings" description="No findings data was returned" />;

  return (
    <div className="space-y-6">
      <PageHeader title="Findings" description="Issues detected across your Kubernetes cluster" />
      <FindingsSummary findings={data.items} />
      <FindingsTable findings={data.items} />
    </div>
  );
}
