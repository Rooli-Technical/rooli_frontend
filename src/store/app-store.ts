import { UserType } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthStoreProps = {
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (value: string | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  user: UserType | null;
  setUser: (value: UserType | null) => void;
  organizationId: string | null;
  setOrganizationId: (value: string | null) => void;
  reference: string | null;
  setReference: (value: string | null) => void;
  clearAuth: () => void;

  platform: "TWITTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN" | null;
  setPlatform: (
    value: "TWITTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN" | null
  ) => void;
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
        user: null,
        setUser: (value) => set({ user: value }),
        organizationId: null,
        setOrganizationId: (value) => set({ organizationId: value }),
        reference: null,
        setReference: (value) => set({ reference: value }),
        platform: null,
        setPlatform: (value) => set({ platform: value }),
        clearAuth: () =>
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            organizationId: null,
            reference: null,
            platform: null,
          }),
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
