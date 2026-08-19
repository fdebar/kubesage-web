import { ApiProvider } from './ApiProvider';
import { DemoProvider } from './DemoProvider';

const mode = import.meta.env.VITE_APP_MODE;

export const provider = mode === 'demo' ? new DemoProvider() : new ApiProvider();
