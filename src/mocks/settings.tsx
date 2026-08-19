export const services = [
  {
    name: 'Prometheus',
    description: 'Metrics and alerting',
    url: 'http://prometheus.monitoring:9090',
    status: 'connected',
  },
  {
    name: 'Loki',
    description: 'Logs',
    url: 'http://loki.monitoring:3100',
    status: 'connected',
  },
  {
    name: 'OpenTelemetry',
    description: 'Telemetry collection',
    url: 'http://alloy.monitoring:4318',
    status: 'connected',
  },
];
