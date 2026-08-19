import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { FindingsPage } from '@/features/findings/FindingsPage';
import { HistoryPage } from '@/features/history/HistoryPage';
import { SettingsPage } from '@/features/settings/SettingsPage';
import { AppShell } from '@/components/layout/AppShell';
import { AnalysisDetailPage } from '@/features/analyses/AnalysisDetailPage';
import { NotFoundPage } from '@/features/not-found/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/analyses/:id',
        element: <AnalysisDetailPage />,
      },
      {
        path: '/findings',
        element: <FindingsPage />,
      },
      {
        path: '/history',
        element: <HistoryPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
