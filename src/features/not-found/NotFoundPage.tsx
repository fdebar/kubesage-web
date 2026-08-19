import { Link } from 'react-router-dom';
import { ArrowLeft, TriangleAlert } from '@/lib/icons';
import { Card } from '@/components/ui/card';
import robot404 from './assets/404-robot.png';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="max-w-8xl relative w-full">
        <Card className="relative overflow-hidden">
          <div className="grid min-h-[550px] grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="text-destructive mb-8 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm">
                <TriangleAlert className="h-4 w-4" />
                <span>Incident · 404 · Resource not found</span>
              </div>

              <h1 className="max-w-md text-5xl font-bold tracking-tight">
                Oops! You've found a dead end.
              </h1>

              <p className="text-muted-foreground mt-6 max-w-md text-lg">
                Looks like this resource crashed and fell into the void.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-md px-6 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </div>

              <p className="text-muted-foreground mt-8 text-sm">
                If you think this is a mistake, check the URL and try again.
              </p>
            </div>

            <div className="relative flex items-center justify-center overflow-hidden p-6">
              <img
                src={robot404}
                alt="A falling KubeSage robot"
                className="h-auto w-full max-w-2xl object-contain"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
