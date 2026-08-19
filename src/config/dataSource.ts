export type DataSource = 'api' | 'demo';

export const dataSource: DataSource = import.meta.env.VITE_DATA_SOURCE === 'demo' ? 'demo' : 'api';

export const isDemoMode = dataSource === 'demo';
