import { isDemoMode } from '@/config/dataSource';
import { getMockWatcherIncidents } from '@/mocks/watcherIncidents';
import type {
  WatcherIncidentStatusFilter,
  WatcherIncidentsResponse,
} from '@/types/watcherIncident';
import { apiClient } from './api/client';

export async function getWatcherIncidents(
  page: number,
  pageSize: number,
  status: WatcherIncidentStatusFilter,
  namespace: string,
): Promise<WatcherIncidentsResponse> {
  if (isDemoMode) return getMockWatcherIncidents(page, pageSize, status, namespace);

  const response = await apiClient.get<WatcherIncidentsResponse>('/watcher/incidents', {
    params: {
      page,
      page_size: pageSize,
      status: status === 'all' ? undefined : status,
      namespace: namespace || undefined,
    },
  });

  return response.data;
}
