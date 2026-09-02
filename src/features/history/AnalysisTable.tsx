import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { AnalysisSummary } from '@/types/analysis';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import { formatDate } from '@/lib/date';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import type { Status } from '@/types/status';
import { observabilityConfig, buildTempoTraceUrl } from '@/config/observability';

interface Props {
  analyses: AnalysisSummary[];
}

export function AnalysisTable({ analyses }: Props) {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="text-muted-foreground border-b text-left text-sm">
            <th className="p-3">Date</th>
            <th className="p-3">Namespace</th>
            <th className="p-3">Pod</th>
            <th className="p-3">Phase</th>
            <th className="p-3">Severity</th>
            <th className="p-3">Findings</th>
            <th className="p-3">Duration</th>
            <th className="p-3">Trace</th>
            <th className="p-3" />
          </tr>
        </thead>

        <tbody>
          {analyses.map((analysis) => {
            const tempoTraceUrl = analysis.trace_id ? buildTempoTraceUrl(analysis.trace_id) : null;

            return (
              <tr key={analysis.id} className="border-b">
                <td className="p-3 text-sm">{formatDate(analysis.created_at)}</td>

                <td className="p-3">{analysis.namespace}</td>

                <td className="p-3 font-medium">{analysis.pod}</td>

                <td className="p-3">
                  <StatusBadge status={analysis.phase as Status} />
                </td>

                <td className="p-3">
                  <SeverityBadge severity={analysis.highest_severity} />
                </td>

                <td className="p-3">{analysis.findings_count}</td>

                <td className="p-3">{analysis.duration_ms} ms</td>

                <td className="p-3">
                  {analysis.trace_id ? (
                    tempoTraceUrl && observabilityConfig.grafanaUrl ? (
                      <a
                        href={tempoTraceUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={analysis.trace_id}
                        className="inline-flex max-w-40 items-center gap-1 truncate font-mono text-xs text-blue-400 transition hover:text-blue-300"
                      >
                        <span className="truncate">{analysis.trace_id}</span>
                        <ExternalLink className="size-3.5 shrink-0" />
                      </a>
                    ) : (
                      <span
                        title={analysis.trace_id}
                        className="text-muted-foreground inline-block max-w-40 truncate font-mono text-xs"
                      >
                        {analysis.trace_id}
                      </span>
                    )
                  ) : (
                    <span className="text-muted-foreground text-xs">No trace ID</span>
                  )}
                </td>

                <td className="p-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/analyses/${analysis.id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
