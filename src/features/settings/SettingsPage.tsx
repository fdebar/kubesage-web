import { useState } from 'react';

import { AIProviderCard } from '@/components/AIProviderCard';
import { PageHeader } from '@/components/common/PageHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import { useSettingsServiceTest } from '@/hooks/useSettingsServiceTest';
import { useSettings } from '@/hooks/useSettings';
import type { SettingsService } from '@/services/settings.service';
import type { ServiceStatus } from '@/types/serviceStatus';
import type { ServiceTestResult } from '@/types/serviceTestResult';

export function SettingsPage() {
  const { data, isLoading, error } = useSettings();
  const serviceTest = useSettingsServiceTest();
  const [testResults, setTestResults] = useState<
    Partial<Record<SettingsService, ServiceTestResult>>
  >({});
  const [serviceStatuses, setServiceStatuses] = useState<
    Partial<Record<SettingsService, ServiceStatus>>
  >({});

  const handleTest = async (service: SettingsService) => {
    setServiceStatuses((current) => ({ ...current, [service]: 'testing' }));

    try {
      const result = await serviceTest.mutateAsync(service);
      setTestResults((current) => ({ ...current, [service]: result }));
      setServiceStatuses((current) => ({ ...current, [service]: result.status }));
    } catch {
      setServiceStatuses((current) => ({ ...current, [service]: 'disconnected' }));

      setTestResults((current) => ({
        ...current,
        [service]: {
          status: 'disconnected',
          latency_ms: null,
          checked_at: new Date().toISOString(),
          message: 'Unable to test service',
        },
      }));
    }
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

      <section className="space-y-4 w-full max-w-xl">
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
          <ServiceCard
            name="Prometheus"
            description="Metrics and alerting"
            url={data.observability.prometheus.endpoint}
            status={serviceStatuses.prometheus ?? 'unknown'}
            latency={testResults.prometheus?.latency_ms}
            message={testResults.prometheus?.message}
            onTest={() => handleTest('prometheus')}
          />

          <ServiceCard
            name="Loki"
            description="Logs"
            url={data.observability.loki.endpoint}
            status={serviceStatuses.loki ?? 'unknown'}
            latency={testResults.loki?.latency_ms}
            message={testResults.loki?.message}
            onTest={() => handleTest('loki')}
          />

          <ServiceCard
            name="OpenTelemetry"
            description="Telemetry collection"
            url={data.observability.opentelemetry.endpoint}
            status={serviceStatuses.opentelemetry ?? 'unknown'}
            latency={testResults.opentelemetry?.latency_ms}
            message={testResults.opentelemetry?.message}
            onTest={() => handleTest('opentelemetry')}
          />
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
          name="OpenAI-compatible"
          description="AI provider for incident analysis"
          endpoint={data.ai.endpoint}
          model={data.ai.model}
          apiKeyConfigured={data.ai.api_key_configured}
          status={serviceStatuses.ai ?? 'unknown'}
          latency={testResults.ai?.latency_ms}
          message={testResults.ai?.message}
          onTest={() => handleTest('ai')}
        />
      </section>
    </div>
  );
}
