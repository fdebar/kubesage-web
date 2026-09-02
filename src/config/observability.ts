const grafanaUrl = import.meta.env.VITE_GRAFANA_URL?.trim() ?? '';

export const observabilityConfig = {
  grafanaUrl,
  tempoDatasourceUid: 'tempo',
} as const;

export function buildTempoTraceUrl(traceId: string): string | null {
  if (!grafanaUrl || !traceId) return null;

  const baseUrl = grafanaUrl.endsWith('/') ? grafanaUrl : `${grafanaUrl}/`;

  const url = new URL('explore', baseUrl);

  const panes = {
    trace: {
      datasource: observabilityConfig.tempoDatasourceUid,
      queries: [
        {
          refId: 'A',
          datasource: {
            type: 'tempo',
            uid: observabilityConfig.tempoDatasourceUid,
          },
          queryType: 'traceql',
          query: traceId,
          limit: 20,
        },
      ],
      range: {
        from: 'now-1h',
        to: 'now',
      },
    },
  };

  url.searchParams.set('orgId', '1');
  url.searchParams.set('schemaVersion', '1');
  url.searchParams.set('panes', JSON.stringify(panes));

  return url.toString();
}
