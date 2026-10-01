export type WatcherIncidentStatus = 'active' | 'resolved';
export type WatcherIncidentStatusFilter = 'all' | WatcherIncidentStatus;

export interface WatcherIncident {
  id: string;
  namespace: string;
  pod: string;
  pod_uid: string;
  reason: string;
  status: WatcherIncidentStatus;
  first_seen_at: string;
  last_seen_at: string;
  resolved_at: string | null;
  last_resource_version: string | null;
  message: string | null;
  analysis_id: string | null;
}

export interface WatcherIncidentsResponse {
  items: WatcherIncident[];
  total: number;
  page: number;
  page_size: number;
}
