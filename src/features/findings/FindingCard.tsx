import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import type { FindingDetail } from '@/types/analysis';
import { EvidenceList } from '@/features/findings/EvidenceList';

interface FindingCardProps {
  finding: FindingDetail;
}

export function FindingCard({ finding }: FindingCardProps) {
  return (
    <Card className="ks-card">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>{finding.title}</CardTitle>
          <SeverityBadge severity={finding.severity} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium">Description</h3>
          <p className="text-muted-foreground mt-2">{finding.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-muted-foreground text-sm">Rule</p>
            <p className="font-medium">{finding.rule}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Kind</p>
            <p className="font-medium">{finding.kind}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Confidence</p>
            <p className="font-medium">{(finding.confidence * 100).toFixed(0)}%</p>
          </div>
        </div>

        {finding.resource && (
          <div>
            <h3 className="font-medium">Resource</h3>
            <p className="text-muted-foreground mt-2">
              {finding.resource.kind} / {finding.resource.name}
            </p>
          </div>
        )}

        <EvidenceList evidences={finding.evidences} />

        {finding.recommendations.length > 0 && (
          <div>
            <h3 className="font-medium">Recommendations</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {finding.recommendations.map((recommendation) => (
                <li key={recommendation}>{recommendation}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
