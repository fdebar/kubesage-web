import { Activity, Clock3, Settings, ShieldCheck } from '@/lib/icons';
import { NavLink } from 'react-router-dom';
import { useDashboard } from '@/hooks/useDashboard';

const navigation = [
  {
    label: 'Dashboard',
    path: '/',
    icon: Activity,
  },
  {
    label: 'Findings',
    path: '/findings',
    icon: ShieldCheck,
  },
  {
    label: 'History',
    path: '/history',
    icon: Clock3,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const { data } = useDashboard();
  const status = data?.cluster.status ?? 'Unknown';
  const color = status === 'healthy' ? 'text-emerald-400' : 'text-red-400';

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-zinc-950 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">🟦 KubeSage</h1>

        <p className="mt-1 text-sm text-zinc-500">AI Kubernetes Observability</p>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-zinc-900 text-zinc-100'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                } `
              }
            >
              <Icon className="size-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-zinc-800 bg-zinc-900 p-3">
        <p className="text-xs text-zinc-500">Connected cluster</p>
        <p className="mt-1 text-sm font-medium">{data?.cluster.name ?? 'Unknown'}</p>
        <p className={`mt-2 text-xs ${color}`}>● {status}</p>
      </div>
    </aside>
  );
}
