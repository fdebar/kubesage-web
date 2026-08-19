import { Activity, Clock3, Settings, ShieldCheck } from '@/lib/icons';
import { NavLink, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const status = data?.cluster.status ?? 'Unknown';
  const isHealthy = status === 'healthy';

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800/80 bg-zinc-950 px-3 py-4">
      <div className="mb-8 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/10">
              <div className="size-3 rotate-45 rounded-sm border-2 border-white" />
            </div>

            <div>
              <h1 className="text-[17px] font-semibold tracking-tight text-zinc-100">KubeSage</h1>

              <p className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
                Kubernetes Intelligence
              </p>
            </div>
          </div>

          <span className="rounded-md border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-zinc-500 uppercase">
            AI
          </span>
        </div>
      </div>

      <nav className="space-y-1">
        <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.15em] text-zinc-600 uppercase">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => {
                const isHistoryActive =
                  item.path === '/history' && location.pathname.startsWith('/analyses/');

                const active = isActive || isHistoryActive;

                return `group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
                  active
                    ? 'bg-zinc-900 text-zinc-100'
                    : 'text-zinc-500 hover:bg-zinc-900/70 hover:text-zinc-200'
                } `;
              }}
            >
              {({ isActive }) => {
                const isHistoryActive =
                  item.path === '/history' && location.pathname.startsWith('/analyses/');

                const active = isActive || isHistoryActive;

                return (
                  <>
                    {active && (
                      <span className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-cyan-400" />
                    )}

                    <Icon
                      className={`size-[17px] transition-colors ${
                        active ? 'text-cyan-400' : 'text-zinc-600 group-hover:text-zinc-400'
                      }`}
                    />

                    <span className="font-medium">{item.label}</span>
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="mb-2 px-3 text-[10px] font-semibold tracking-[0.15em] text-zinc-600 uppercase">
          Environment
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3">
          <div className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                isHealthy
                  ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                  : 'bg-red-400 shadow-sm shadow-red-400/50'
              }`}
            />

            <span className="text-xs font-medium text-zinc-400">Connected cluster</span>
          </div>

          <p className="mt-2 truncate text-sm font-semibold text-zinc-100">
            {data?.cluster.name ?? 'Unknown'}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span
              className={`text-xs font-medium ${isHealthy ? 'text-emerald-400' : 'text-red-400'}`}
            >
              {status}
            </span>

            <span className="text-[10px] text-zinc-600"></span>
          </div>
        </div>
      </div>
    </aside>
  );
}
