import type { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
};

export function MetricCard({ title, value, icon: Icon, description }: MetricCardProps) {
  return (
    <Card className="ks-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        <Icon className="text-muted-foreground size-4" />
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">{value}</div>

        {description && <p className="ks-muted mt-2 text-sm">{description}</p>}
      </CardContent>
    </Card>
  );
}
