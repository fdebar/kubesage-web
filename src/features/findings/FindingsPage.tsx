import { PageHeader } from '@/components/common/PageHeader';
import { FindingsSummary } from '@/features/findings/FindingsSummary';
import { mockFindings } from '@/mocks/findings';
import { FindingsTable } from './FindingsTable';

export function FindingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Findings" description="Issues detected across your Kubernetes cluster" />

      <FindingsSummary findings={mockFindings} />

      <FindingsTable findings={mockFindings} />
    </div>
  );
}
