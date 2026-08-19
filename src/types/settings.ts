export interface ServiceSettings {
  endpoint: string;
}

export interface AIProviderSettings {
  provider: string;
  endpoint: string;
  model: string;
  api_key_configured: boolean;
}

export interface Settings {
  environment: string;
  version: string;
  observability: {
    prometheus: ServiceSettings;
    loki: ServiceSettings;
    opentelemetry: ServiceSettings;
  };
  ai: AIProviderSettings;
}
