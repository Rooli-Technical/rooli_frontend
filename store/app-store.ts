import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthStoreProps = {
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (value: string | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

export const useAppStore = create<AuthStoreProps>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        setAccessToken: (value) => set({ accessToken: value }),
        refreshToken: null,
        setRefreshToken: (value) => set({ refreshToken: value }),
        hasHydrated: false,
        setHasHydrated: (value) => set({ hasHydrated: value }),
      }),
      {
        name: "rooli-store",
        partialize: (state) => ({
          accessToken: state.accessToken,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) state.setHasHydrated(true);
        },
      }
    )
  )
);
