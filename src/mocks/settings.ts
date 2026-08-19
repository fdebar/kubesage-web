import type { Settings } from '@/types/settings';

export const settingsMock: Settings = {
  environment: 'development',
  version: '1.0.0-beta',
  observability: {
    prometheus: {
      endpoint: 'http://localhost:9090',
    },
    loki: {
      endpoint: 'http://localhost:3100',
    },
    opentelemetry: {
      endpoint: 'http://localhost:4318',
    },
  },
  ai: {
    provider: 'ollama',
    endpoint: 'http://localhost:11434/v1',
    model: 'qwen2.5-coder:14b',
    apiKeyConfigured: true,
  },
};
