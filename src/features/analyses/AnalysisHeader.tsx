import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import { observabilityConfig, buildTempoTraceUrl } from '@/config/observability';
import type { AnalysisDetail } from '@/types/analysis';
import { format } from '@/lib/duration';

interface AnalysisHeaderProps {
  analysis: AnalysisDetail;
}

export function AnalysisHeader({ analysis }: AnalysisHeaderProps) {
  const severity = analysis.findings.length > 0 ? analysis.findings[0].severity : 'INFO';
  const tempoTraceUrl = analysis.trace_id ? buildTempoTraceUrl(analysis.trace_id) : null;

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

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-muted-foreground text-sm">Phase</p>
            <p className="font-medium">{analysis.incident.phase}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Duration</p>
            <p className="font-medium">{format(analysis.duration_ms)}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Findings</p>
            <p className="font-medium">{analysis.findings.length}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Trace</p>
            {analysis.trace_id ? (
              <div className="space-y-1">
                <p className="font-mono text-xs break-all" title={analysis.trace_id}>
                  {analysis.trace_id}
                </p>

                {tempoTraceUrl && observabilityConfig.grafanaUrl && (
                  <a
                    href={tempoTraceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-400 transition hover:text-blue-300"
                  >
                    View in Tempo
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No trace ID</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
