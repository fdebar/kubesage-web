import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import type { SeveritySummary } from '@/types/dashboard';
import type { Severity } from '@/types/severity';

interface SeveritySummaryCardProps {
  severities: SeveritySummary;
}

export function SeveritySummaryCard({ severities }: SeveritySummaryCardProps) {
  return (
    <Card className="ks-card">
      <CardHeader>
        <CardTitle>Findings by Severity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {Object.entries(severities).map(([severity, count]) => (
          <div key={severity} className="flex items-center justify-between">
            <SeverityBadge severity={severity as Severity} />
            <span className="ml-3 flex-1 font-semibold">{count}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
