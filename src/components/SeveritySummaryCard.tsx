import { Card } from '@/components/ui/card';
import type { SeveritySummary } from '@/types/dashboard';
import type { Severity } from '@/types/severity';

interface SeveritySummaryCardProps {
  severities: SeveritySummary;
}

const severityColors: Record<Severity, string> = {
  CRITICAL: 'bg-red-500',
  HIGH: 'bg-orange-500',
  NONE: 'bg-yellow-500',
  LOW: 'bg-cyan-500',
  INFO: 'bg-blue-500',
  WARNING: 'bg-yellow-500',
};

export const SeveritySummaryCard = ({ severities }: SeveritySummaryCardProps) => (
  <Card className="ks-card px-4 py-3">
    <h3 className="text-base leading-snug font-medium group-data-[size=sm]/card:text-sm">
      Findings by Severity
    </h3>

    <div className="grid grid-cols-2">
      {Object.entries(severities).map(([severity, count], index) => (
        <div
          key={severity}
          className={[
            'flex items-center justify-between py-2',
            index % 2 === 0 && 'border-r pr-4',
            index % 2 === 1 && 'pl-4',
            index > 1 && 'border-t',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${severityColors[severity.toUpperCase() as Severity]}`}
            />
            <span className="text-sm capitalize">{severity}</span>
          </div>
          <span className="font-semibold tabular-nums">{count}</span>
        </div>
      ))}
    </div>
  </Card>
);
