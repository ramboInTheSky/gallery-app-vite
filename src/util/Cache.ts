/* istanbul ignore file because it only provides settings*/
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

// React Query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: parseInt(process.env.STALE_TIME || "1") * 1000,
    },
  },
});

// Cache persistence configuration
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: parseInt(process.env.CACHE_TIME || "1") * 1000,
});

export default queryClient;
