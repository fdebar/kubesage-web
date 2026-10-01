import { useState, type FormEvent } from 'react';

import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { PageHeader } from '@/components/common/PageHeader';
import { Pagination } from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { useWatcherIncidents } from '@/hooks/useWatcherIncidents';
import { formatDate } from '@/lib/date';
import type { WatcherIncidentStatusFilter } from '@/types/watcherIncident';

const pageSize = 10;

function statusClasses(status: 'active' | 'resolved'): string {
  return status === 'active'
    ? 'border-amber-500/20 bg-amber-500/10 text-amber-300'
    : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
}

export function IncidentsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<WatcherIncidentStatusFilter>('active');
  const [namespaceInput, setNamespaceInput] = useState('');
  const [namespace, setNamespace] = useState('');
  const { data, isLoading, isError, isFetching } = useWatcherIncidents(
    page,
    pageSize,
    status,
    namespace,
  );

  if (isLoading) return <LoadingState />;
  if (isError) {
    return (
      <EmptyState
        title="Unable to load incidents"
        description="The watcher incidents API is unavailable."
      />
    );
  }
  if (!data)
    return <EmptyState title="No incidents" description="No incident data was returned." />;

  function updateStatus(value: WatcherIncidentStatusFilter) {
    setStatus(value);
    setPage(1);
  }

  function applyNamespace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNamespace(namespaceInput.trim());
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Incidents"
        description="Track watcher-detected incidents from detection through recovery."
      />

      <div className="bg-card flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">Status</span>
            <select
              value={status}
              onChange={(event) => updateStatus(event.target.value as WatcherIncidentStatusFilter)}
              className="border-input bg-background h-9 min-w-36 rounded-md border px-3"
            >
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="all">All incidents</option>
            </select>
          </label>

          <form onSubmit={applyNamespace} className="flex items-end gap-2">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted-foreground">Namespace</span>
              <input
                value={namespaceInput}
                onChange={(event) => setNamespaceInput(event.target.value)}
                placeholder="All namespaces"
                className="border-input bg-background h-9 w-48 rounded-md border px-3 text-sm"
              />
            </label>
            <Button type="submit" variant="outline" size="sm">
              Apply
            </Button>
          </form>
        </div>

        <span className="text-muted-foreground text-xs">
          {isFetching ? 'Refreshing…' : 'Refreshes every 30 seconds'}
        </span>
      </div>

      {data.items.length === 0 ? (
        <EmptyState
          title="No incidents found"
          description="Try another status or namespace filter."
        />
      ) : (
        <>
          <div className="bg-card overflow-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Pod</th>
                    <th className="px-4 py-3 font-medium">Namespace</th>
                    <th className="px-4 py-3 font-medium">Cause</th>
                    <th className="px-4 py-3 font-medium">Detected</th>
                    <th className="px-4 py-3 font-medium">Last seen</th>
                    <th className="px-4 py-3 font-medium">Resolved</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.items.map((incident) => (
                    <tr key={incident.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${statusClasses(incident.status)}`}
                        >
                          {incident.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium">{incident.pod}</p>
                        {incident.message && (
                          <p className="text-muted-foreground mt-1 max-w-sm text-xs">
                            {incident.message}
                          </p>
                        )}
                      </td>
                      <td className="text-muted-foreground px-4 py-4">{incident.namespace}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-md bg-zinc-800 px-2 py-1 text-xs">
                          {incident.reason}
                        </span>
                      </td>
                      <td className="text-muted-foreground px-4 py-4 whitespace-nowrap">
                        {formatDate(incident.first_seen_at)}
                      </td>
                      <td className="text-muted-foreground px-4 py-4 whitespace-nowrap">
                        {formatDate(incident.last_seen_at)}
                      </td>
                      <td className="text-muted-foreground px-4 py-4 whitespace-nowrap">
                        {incident.resolved_at ? formatDate(incident.resolved_at) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            total={data.total}
            page={data.page}
            pageSize={data.page_size}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
