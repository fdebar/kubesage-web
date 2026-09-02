interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_DATA_SOURCE?: string;
  readonly VITE_BASE_PATH?: string;
  readonly VITE_GRAFANA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_VERSION__: string;
declare const __APP_BUILD_SHA__: string;
