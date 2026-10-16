import { create } from 'zustand';
import type { Credentials } from '@/shared/api/types';
import { STORAGE_KEY } from '@/shared/config/constants';

function readCredentials(): Credentials | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<Credentials>;
    if (parsed.idInstance && parsed.apiTokenInstance) {
      return {
        idInstance: String(parsed.idInstance),
        apiTokenInstance: String(parsed.apiTokenInstance),
      };
    }

    return null;
  } catch {
    return null;
  }
}

interface SessionState {
  credentials: Credentials | null;
  setCredentials: (credentials: Credentials) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  credentials: readCredentials(),

  setCredentials: (credentials) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
    set({ credentials });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ credentials: null });
  },
}));
