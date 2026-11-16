import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthCredentials {
  username: string;
  passwordHash: string; // Contraseña simple almacenada
}

interface AuthState {
  monkyAuth: AuthCredentials;
  miCasaAuth: AuthCredentials;
  isMonkyLoggedIn: boolean;
  isMiCasaLoggedIn: boolean;

  loginMonky: (user: string, pass: string) => boolean;
  loginMiCasa: (user: string, pass: string) => boolean;
  logoutMonky: () => void;
  logoutMiCasa: () => void;
  updateCredentials: (business: 'monky' | 'micasa', user: string, pass: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Credenciales iniciales
      monkyAuth: {
        username: 'monky',
        passwordHash: 'monky2026',
      },
      miCasaAuth: {
        username: 'micasa',
        passwordHash: 'micasa2026',
      },

      isMonkyLoggedIn: false,
      isMiCasaLoggedIn: false,

      loginMonky: (user: string, pass: string) => {
        const { monkyAuth } = get();
        if (
          user.trim().toLowerCase() === monkyAuth.username.toLowerCase() &&
          pass.trim() === monkyAuth.passwordHash
        ) {
          set({ isMonkyLoggedIn: true });
          return true;
        }
        return false;
      },

      loginMiCasa: (user: string, pass: string) => {
        const { miCasaAuth } = get();
        if (
          user.trim().toLowerCase() === miCasaAuth.username.toLowerCase() &&
          pass.trim() === miCasaAuth.passwordHash
        ) {
          set({ isMiCasaLoggedIn: true });
          return true;
        }
        return false;
      },

      logoutMonky: () => set({ isMonkyLoggedIn: false }),
      logoutMiCasa: () => set({ isMiCasaLoggedIn: false }),

      updateCredentials: (business, user, pass) => {
        if (!user.trim() || !pass.trim()) return;
        set(() => {
          if (business === 'monky') {
            return {
              monkyAuth: { username: user.trim(), passwordHash: pass.trim() },
            };
          }
          return {
            miCasaAuth: { username: user.trim(), passwordHash: pass.trim() },
          };
        });
      },
    }),
    {
      name: 'platform-auth-session',
    }
  )
);
