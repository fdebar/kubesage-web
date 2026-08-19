import { CheckCircle2, CircleAlert, CircleHelp, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { ServiceStatus } from '@/types/serviceStatus';
import type { ServiceTestResult } from '@/types/serviceTestResult';

interface AIProviderCardProps {
  name: string;
  description: string;
  endpoint: string;
  model: string;
  apiKeyConfigured: boolean;
  testResult?: ServiceTestResult;
  onTest: () => void;
}

const statusConfig: Record<
  ServiceStatus,
  {
    label: string;
    icon: typeof CircleHelp;
    className: string;
  }
> = {
  unknown: {
    label: 'Not tested',
    icon: CircleHelp,
    className: 'text-muted-foreground',
  },
  testing: {
    label: 'Testing...',
    icon: Loader2,
    className: 'text-muted-foreground',
  },
  connected: {
    label: 'Connected',
    icon: CheckCircle2,
    className: 'text-green-600',
  },
  disconnected: {
    label: 'Connection failed',
    icon: CircleAlert,
    className: 'text-destructive',
  },
};

export function AIProviderCard({
  name,
  description,
  endpoint,
  model,
  apiKeyConfigured,
  testResult,
  onTest,
}: AIProviderCardProps) {
  const status = testResult?.status ?? 'unknown';
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const isTesting = status === 'testing';

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <div className={`flex items-center gap-1.5 text-sm font-medium ${config.className}`}>
          <StatusIcon className={`size-4 ${isTesting ? 'animate-spin' : ''}`} />
          <span>{config.label}</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-medium">Endpoint</p>
            <p className="truncate font-mono text-sm">{endpoint}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-1 text-xs font-medium">Model</p>
              <p className="font-mono text-sm">{model}</p>
            </div>

            <div>
              <p className="text-muted-foreground mb-1 text-xs font-medium">API Key</p>
              <p className="font-mono text-sm">
                {apiKeyConfigured ? '••••••••••••••••' : 'Not configured'}
              </p>
            </div>
          </div>

          {testResult && status !== 'testing' && (
            <div className="text-muted-foreground flex items-center gap-4 text-xs">
              <span>
                Last checked{' '}
                {testResult.checkedAt.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>

              {testResult.latencyMs !== undefined && <span>{testResult.latencyMs} ms</span>}
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={onTest} disabled={isTesting}>
              {isTesting ? 'Testing...' : 'Test connection'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
