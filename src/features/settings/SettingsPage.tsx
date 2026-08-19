import { useState } from 'react';

import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceCard } from '@/components/ServiceCard';

import type { ServiceTestResult } from '@/types/serviceTestResult';
import { AIProviderCard } from '@/components/AIProviderCard';
import { aiProvider } from '@/mocks/aiprovider';

const observabilityServices = [
  {
    name: 'Prometheus',
    description: 'Metrics and alerting',
    url: 'http://prometheus.monitoring:9090',
  },
  {
    name: 'Loki',
    description: 'Logs',
    url: 'http://loki.monitoring:3100',
  },
  {
    name: 'Tempo',
    description: 'Distributed traces',
    url: 'http://tempo.monitoring:3200',
  },
  {
    name: 'OpenTelemetry',
    description: 'Telemetry collection',
    url: 'http://alloy.monitoring:4318',
  },
];

export function SettingsPage() {
  const [testResults, setTestResults] = useState<Record<string, ServiceTestResult>>({});
  const [aiProviderTestResult, setAiProviderTestResult] = useState<ServiceTestResult>();

  const handleTest = (serviceName: string) => {
    setTestResults((current) => ({
      ...current,
      [serviceName]: {
        status: 'testing',
        checkedAt: new Date(),
      },
    }));

    setTimeout(() => {
      const success = Math.random() > 0.2;

      setTestResults((current) => ({
        ...current,
        [serviceName]: {
          status: success ? 'connected' : 'disconnected',
          checkedAt: new Date(),
          latencyMs: success ? Math.floor(Math.random() * 100) + 20 : undefined,
        },
      }));
    }, 1000);
  };

  const handleAIProviderTest = () => {
    setAiProviderTestResult({
      status: 'testing',
      checkedAt: new Date(),
    });

    setTimeout(() => {
      const success = Math.random() > 0.2;

      setAiProviderTestResult({
        status: success ? 'connected' : 'disconnected',
        checkedAt: new Date(),
        latencyMs: success ? Math.floor(Math.random() * 100) + 20 : undefined,
      });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Configure KubeSage" />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">General</h2>
          <p className="text-muted-foreground text-sm">KubeSage configuration</p>
        </div>

        <Card>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Environment</p>
              <p className="font-medium">Production</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Version</p>
              <p className="font-medium">v0.1.0</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Observability Services</h2>
          <p className="text-muted-foreground text-sm">
            Configure and test KubeSage observability integrations
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {observabilityServices.map((service) => (
            <ServiceCard
              key={service.name}
              {...service}
              testResult={testResults[service.name]}
              onTest={() => handleTest(service.name)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">AI Provider</h2>
          <p className="text-muted-foreground text-sm">
            Configure and test the AI provider used for incident analysis
          </p>
        </div>

        <AIProviderCard
          {...aiProvider}
          testResult={aiProviderTestResult}
          onTest={handleAIProviderTest}
        />
      </section>
    </div>
  );
}
