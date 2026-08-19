import { Link } from 'react-router-dom';
import { ExternalLink } from '@/lib/icons';
import type { Finding, FindingSeverity } from '@/types/types';

interface FindingsTableProps {
  findings: Finding[];
}

const severityStyles: Record<FindingSeverity, string> = {
  critical: 'bg-destructive/10 text-destructive',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-muted text-muted-foreground',
};

const severityLabels: Record<FindingSeverity, string> = {
  critical: 'Critical',
  warning: 'Warning',
  info: 'Info',
};

export function FindingsTable({ findings }: FindingsTableProps) {
  if (findings.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <p className="text-muted-foreground text-sm">No findings match the current filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-card overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 border-b">
            <tr className="text-left">
              <th className="px-6 py-3 font-medium">Severity</th>
              <th className="px-6 py-3 font-medium">Finding</th>
              <th className="px-6 py-3 font-medium">Resource</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Last seen</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y">
            {findings.map((finding) => (
              <tr key={finding.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${severityStyles[finding.severity]}`}
                  >
                    {severityLabels[finding.severity]}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="max-w-md">
                    <p className="font-medium">{finding.title}</p>
                    <p className="text-muted-foreground mt-1 line-clamp-1 text-xs">
                      {finding.description}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{finding.resource.name}</p>

                    <p className="text-muted-foreground mt-1 text-xs">
                      {finding.resource.kind}
                      {finding.resource.namespace && ` · ${finding.resource.namespace}`}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={finding.status} />
                </td>

                <td className="text-muted-foreground px-6 py-4 whitespace-nowrap">
                  {formatRelativeTime(finding.lastSeen)}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/analysis/${finding.analysisId}`}
                    className="text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    View analysis
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: Finding['status'];
}

function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'active';

  return (
    <span
      className={
        isActive
          ? 'bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium'
          : 'bg-muted text-muted-foreground inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium'
      }
    >
      {isActive ? 'Active' : 'Resolved'}
    </span>
  );
}

function formatRelativeTime(value: string): string {
  const timestamp = new Date(value).getTime();
  const now = Date.now();

  const diffInSeconds = Math.max(0, Math.floor((now - timestamp) / 1000));
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}
