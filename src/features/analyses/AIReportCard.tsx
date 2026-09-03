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

        {(report.confidence !== null || report.impact) && (
          <div className="grid gap-4 md:grid-cols-2">
            {report.confidence !== null && (
              <div>
                <h3 className="font-medium">Confidence</h3>
                <p className="text-muted-foreground mt-2">{Math.round(report.confidence * 100)}%</p>
              </div>
            )}

            {report.impact && (
              <div>
                <h3 className="font-medium">Impact</h3>
                <p className="text-muted-foreground mt-2">{report.impact}</p>
              </div>
            )}
          </div>
        )}

        {report.evidence.length > 0 && (
          <div>
            <h3 className="font-medium">Evidence</h3>
            <ul className="mt-2 space-y-2">
              {report.evidence.map((item) => (
                <li key={item.id} className="rounded-md border p-3">
                  <p>{item.description ?? item.id}</p>

                  <div className="text-muted-foreground mt-1 flex gap-2 text-xs">
                    <span className="font-mono">{item.id}</span>

                    {item.source && (
                      <>
                        <span>·</span>
                        <span>{item.source}</span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {report.recommendations.length > 0 && (
          <div>
            <h3 className="font-medium">Recommendations</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {report.recommendations.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {report.additional_investigations.length > 0 && (
          <div>
            <h3 className="font-medium">Additional Investigations</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {report.additional_investigations.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
