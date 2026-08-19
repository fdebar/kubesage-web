import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceCard } from '@/components/ServiceCard';

import { AIProviderCard } from '@/components/AIProviderCard';
import { useSettings } from '@/hooks/useSettings';
import { useState } from 'react';
import type { ServiceTestResult } from '@/types/serviceTestResult';

const observabilityMetadata = {
  prometheus: {
    name: 'Prometheus',
    description: 'Metrics and alerting',
  },
  loki: {
    name: 'Loki',
    description: 'Logs',
  },
  opentelemetry: {
    name: 'OpenTelemetry',
    description: 'Telemetry collection',
  },
};

const aiMetadata = {
  name: 'OpenAI-compatible',
  description: 'AI provider for incident analysis',
};

export function SettingsPage() {
  const [testResults, setTestResults] = useState<Record<string, ServiceTestResult>>({});
  const [aiProviderTestResult, setAiProviderTestResult] = useState<ServiceTestResult>();

  const { data, isLoading, error } = useSettings();

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
  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader title="Settings" description="Configure KubeSage" />

        <p className="text-muted-foreground text-sm">Loading settings...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-8">
        <PageHeader title="Settings" description="Configure KubeSage" />

        <p className="text-destructive text-sm">Failed to load settings.</p>
      </div>
    );
  }

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
              <p className="font-medium">{data.environment}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Version</p>
              <p className="font-medium">v{data.version}</p>
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
          {Object.entries(observabilityMetadata).map(([serviceKey, metadata]) => (
            <ServiceCard
              key={serviceKey}
              name={metadata.name}
              description={metadata.description}
              url={data.observability[serviceKey as keyof typeof data.observability].endpoint}
              testResult={testResults[serviceKey]}
              onTest={() => handleTest(serviceKey)}
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
          name={aiMetadata.name}
          description={aiMetadata.description}
          endpoint={data.ai.endpoint}
          model={data.ai.model}
          apiKeyConfigured={data.ai.api_key_configured}
          testResult={aiProviderTestResult}
          onTest={handleAIProviderTest}
        />
      </section>
    </div>
  );
}
