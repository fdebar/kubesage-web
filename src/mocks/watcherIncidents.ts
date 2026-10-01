import type { WatcherIncident, WatcherIncidentsResponse } from '@/types/watcherIncident';

const now = Date.now();

export const mockWatcherIncidents: WatcherIncident[] = [
  {
    id: 'demo-incident-1',
    namespace: 'production',
    pod: 'payment-service-7c48f4b7c6-2xf8n',
    pod_uid: 'demo-pod-uid-1',
    reason: 'CrashLoopBackOff',
    status: 'active',
    first_seen_at: new Date(now - 12 * 60_000).toISOString(),
    last_seen_at: new Date(now - 30_000).toISOString(),
    resolved_at: null,
    last_resource_version: '184209',
    message: 'Container is in CrashLoopBackOff',
    analysis_id: 'analysis-001',
  },
  {
    id: 'demo-incident-2',
    namespace: 'payments',
    pod: 'payment-worker-6bdccf9fb7-p4x2s',
    pod_uid: 'demo-pod-uid-2',
    reason: 'OOMKilled',
    status: 'active',
    first_seen_at: new Date(now - 46 * 60_000).toISOString(),
    last_seen_at: new Date(now - 2 * 60_000).toISOString(),
    resolved_at: null,
    last_resource_version: '184002',
    message: 'Container killed because of memory limit',
    analysis_id: null,
  },
  {
    id: 'demo-incident-3',
    namespace: 'production',
    pod: 'catalog-api-5c76d4d87b-vn9rt',
    pod_uid: 'demo-pod-uid-3',
    reason: 'ImagePullBackOff',
    status: 'resolved',
    first_seen_at: new Date(now - 4 * 60 * 60_000).toISOString(),
    last_seen_at: new Date(now - 3 * 60 * 60_000).toISOString(),
    resolved_at: new Date(now - 3 * 60 * 60_000).toISOString(),
    last_resource_version: '181337',
    message: 'Container is in ImagePullBackOff',
    analysis_id: null,
  },
  {
    id: 'demo-incident-4',
    namespace: 'staging',
    pod: 'reporting-api-6679c99488-bw2kl',
    pod_uid: 'demo-pod-uid-4',
    reason: 'CrashLoopBackOff',
    status: 'resolved',
    first_seen_at: new Date(now - 9 * 60 * 60_000).toISOString(),
    last_seen_at: new Date(now - 8 * 60 * 60_000).toISOString(),
    resolved_at: new Date(now - 8 * 60 * 60_000).toISOString(),
    last_resource_version: '179240',
    message: 'Container is in CrashLoopBackOff',
    analysis_id: null,
  },
];

export function getMockWatcherIncidents(
  page: number,
  pageSize: number,
  status: 'all' | 'active' | 'resolved',
  namespace: string,
): WatcherIncidentsResponse {
  const filtered = mockWatcherIncidents.filter((incident) => {
    const statusMatches = status === 'all' || incident.status === status;
    const namespaceMatches =
      namespace.length === 0 || incident.namespace.toLowerCase().includes(namespace.toLowerCase());
    return statusMatches && namespaceMatches;
  });
  const start = (page - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    page_size: pageSize,
  };
}
