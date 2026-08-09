import { useNavigate } from 'react-router-dom';
import type { AnalysisSummary } from '@/types/analysis';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import { formatDate } from '@/lib/date';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import type { Status } from '@/types/status';

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
            <th className="p-3" />
          </tr>
        </thead>

        <tbody>
          {analyses.map((analysis) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
