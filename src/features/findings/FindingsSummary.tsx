import { Activity, Info, ShieldAlert, TriangleAlert } from '@/lib/icons';
import { MetricCard } from '@/components/common/MetricCard';
import type { Finding } from '@/types/types';

interface FindingsSummaryProps {
  findings: Finding[];
}

export function FindingsSummary({ findings }: FindingsSummaryProps) {
  const total = findings.length;
  const critical = findings.filter((finding) => finding.severity === 'CRITICAL').length;
  const warning = findings.filter((finding) => finding.severity === 'WARNING').length;
  const info = findings.filter((finding) => finding.severity === 'INFO').length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total Findings"
        value={total.toString()}
        icon={ShieldAlert}
        description="Detected issues"
      />

      <MetricCard
        title="Critical"
        value={critical.toString()}
        icon={TriangleAlert}
        description="Critical issues"
      />

      <MetricCard
        title="Warning"
        value={warning.toString()}
        icon={Activity}
        description="Warnings detected"
      />

      <MetricCard
        title="Info"
        value={info.toString()}
        icon={Info}
        description="Informational findings"
      />
    </div>
  );
}
