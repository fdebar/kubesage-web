import { Link } from 'react-router-dom';

import { ExternalLink } from '@/lib/icons';
import type { Finding } from '@/types/types';
import { SeverityBadge } from '@/components/common/SeverityBadge';

interface FindingsTableProps {
  findings: Finding[];
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

export function FindingsTable({ findings }: FindingsTableProps) {
  if (findings.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <p className="text-muted-foreground text-sm">No findings found.</p>
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
              <th className="px-6 py-3 font-medium">Detected</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y">
            {findings.map((finding) => (
              <tr key={finding.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <SeverityBadge severity={finding.severity} />
                </td>

                <td className="px-6 py-4">
                  <div className="max-w-md">
                    <p className="font-medium">{finding.title}</p>

                    <p className="text-muted-foreground mt-1 line-clamp-1 text-xs">
                      {finding.description}
                    </p>

                    <p className="text-muted-foreground mt-1 text-xs">{finding.rule}</p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {finding.resource ? (
                    <div>
                      <p className="font-medium">{finding.resource.name}</p>

                      <p className="text-muted-foreground mt-1 text-xs">
                        {finding.resource.kind}
                        {finding.resource.namespace && ` · ${finding.resource.namespace}`}
                      </p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs">No resource</span>
                  )}
                </td>

                <td className="text-muted-foreground px-6 py-4 text-xs whitespace-nowrap">
                  {formatRelativeTime(finding.created_at)}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/analyses/${finding.analysis_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
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
