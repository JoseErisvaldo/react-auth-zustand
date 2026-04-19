import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (data: { user: AuthState["user"]; token: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: ({ user, token }: { user: AuthState["user"]; token: string }) =>
        set({ user, token, isAuthenticated: true }),

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
