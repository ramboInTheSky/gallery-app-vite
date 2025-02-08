declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly STALE_TIME: string;
    readonly CACHE_TIME: string;
    readonly LOCAL_STORAGE_PREFIX: string
  }
}
