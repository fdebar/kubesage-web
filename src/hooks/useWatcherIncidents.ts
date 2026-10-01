import { useQuery } from '@tanstack/react-query';

import { isDemoMode } from '@/config/dataSource';
import { getWatcherIncidents } from '@/services/watcherIncidents.service';
import type { WatcherIncidentStatusFilter } from '@/types/watcherIncident';

export function useWatcherIncidents(
  page: number,
  pageSize: number,
  status: WatcherIncidentStatusFilter,
  namespace: string,
) {
  return useQuery({
    queryKey: ['watcher-incidents', page, pageSize, status, namespace],
    queryFn: () => getWatcherIncidents(page, pageSize, status, namespace),
    refetchInterval: isDemoMode ? false : 30_000,
    placeholderData: (previous) => previous,
  });
}
