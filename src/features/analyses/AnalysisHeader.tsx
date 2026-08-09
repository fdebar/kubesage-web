import { Card, CardContent } from '@/components/ui/card';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import type { AnalysisDetail } from '@/types/analysis';

interface AnalysisHeaderProps {
  analysis: AnalysisDetail;
}

export function AnalysisHeader({ analysis }: AnalysisHeaderProps) {
  const severity = analysis.findings.length > 0 ? analysis.findings[0].severity : 'INFO';

  return (
    <Card className="ks-card">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{analysis.incident.pod}</h1>
            <p className="text-muted-foreground">Namespace: {analysis.incident.namespace}</p>
          </div>
          <SeverityBadge severity={severity} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-muted-foreground text-sm">Phase</p>
            <p className="font-medium">{analysis.incident.phase}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Duration</p>

            <p className="font-medium">{analysis.duration_ms} ms</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Findings</p>
            <p className="font-medium">{analysis.findings.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
