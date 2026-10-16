import { useCallback, useState, type FormEvent } from 'react';
import { extractApiError } from '@/shared/api/errors';
import { getStateInstance } from '@/features/auth/api/getStateInstance';
import { useAuth } from '@/features/auth/model/useAuth';
import type { CredentialsInputModel } from '@/features/auth/model/useCredentialsInput';

export interface LoginFormState {
  isLoading: boolean;
  error: string | null;
  canSubmit: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Логика отправки формы авторизации: проверка учётных данных через GREEN API
 * и сохранение их в сессии. Состоянием полей управляет `useCredentialsInput`,
 * чья модель передаётся аргументом (композиция хуков в компоненте).
 */
export function useLoginForm(input: CredentialsInputModel): LoginFormState {
  const { setCredentials } = useAuth();
  const { isFilled, getCredentials } = input;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = isFilled && !isLoading;

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      if (!isFilled || isLoading) {
        return;
      }

      setError(null);
      setIsLoading(true);

      const credentials = getCredentials();

      try {
        await getStateInstance(credentials);
        setCredentials(credentials);
      } catch (err) {
        setError(extractApiError(err));
      } finally {
        setIsLoading(false);
      }
    },
    [isFilled, isLoading, getCredentials, setCredentials],
  );

  return {
    isLoading,
    error,
    canSubmit,
    handleSubmit,
  };
}
