import { useSessionStore } from '@/entities/session/model/store';

/** Доступ к состоянию авторизации и действиям сессии. */
export const useAuth = () => {
  const credentials = useSessionStore((state) => state.credentials);
  const setCredentials = useSessionStore((state) => state.setCredentials);
  const logout = useSessionStore((state) => state.logout);

  return {
    credentials,
    isAuthenticated: credentials !== null,
    setCredentials,
    logout,
  };
}
