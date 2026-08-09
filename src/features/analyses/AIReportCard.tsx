import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AIReport } from '@/types/analysis';

interface AIReportCardProps {
  report: AIReport;
}

export function AIReportCard({ report }: AIReportCardProps) {
  return (
    <Card className="ks-card">
      <CardHeader>
        <CardTitle>AI Diagnosis</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium">Summary</h3>
          <p className="text-muted-foreground mt-2">{report.summary}</p>
        </div>

        {report.root_cause && (
          <div>
            <h3 className="font-medium">Root Cause</h3>
            <p className="text-muted-foreground mt-2">{report.root_cause}</p>
          </div>
        )}

        {report.evidence.length > 0 && (
          <div>
            <h3 className="font-medium">Evidence</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {report.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {report.recommendations.length > 0 && (
          <div>
            <h3 className="font-medium">Recommendations</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {report.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {report.additional_investigations.length > 0 && (
          <div>
            <h3 className="font-medium">Additional Investigations</h3>

            <ul className="mt-2 list-disc space-y-1 pl-5">
              {report.additional_investigations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
