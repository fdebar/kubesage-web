import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, SearchX } from '@/lib/icons';
import { Card, CardContent } from '@/components/ui/card';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <Card className="relative overflow-hidden">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center sm:px-12">
            {/* Illustration placeholder */}
            <div className="bg-muted/40 relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl border">
              <Bot className="text-muted-foreground h-12 w-12" />

              <div className="bg-background absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border">
                <SearchX className="text-muted-foreground h-4 w-4" />
              </div>
            </div>

            {/* Content */}
            <div className="relative">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>

              <p className="text-muted-foreground mx-auto mt-4 max-w-md">
                Looks like this resource crashed. The page you're looking for doesn't exist or has
                been moved.
              </p>

              {/* Action */}
              <div className="mt-8">
                <Link
                  to="/"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to dashboard
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
