import { CheckCircle2, CircleAlert, CircleHelp, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { ServiceStatus } from '@/types/serviceStatus';

interface ServiceCardProps {
  name: string;
  description: string;
  url: string;
  status: ServiceStatus;
  latency?: number | null;
  message?: string | null;
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

export function ServiceCard({
  name,
  description,
  url,
  status,
  latency,
  message,
  onTest,
}: ServiceCardProps) {
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

            <p className="truncate font-mono text-sm">{url || 'Not configured'}</p>
          </div>

          {message && status === 'disconnected' && (
            <p className="text-destructive text-sm">{message}</p>
          )}

          {status === 'connected' && message && (
            <p className="text-muted-foreground text-sm">{message}</p>
          )}

          <div className="text-muted-foreground h-4 text-xs">
            {status !== 'unknown' && status !== 'testing' && latency != null && (
              <span>{latency} ms</span>
            )}
          </div>

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
