import { useCallback, useState, type ChangeEvent } from 'react';
import type { Credentials } from '@/shared/api/types';

export interface CredentialsInputModel {
  idInstance: string;
  apiTokenInstance: string;
  showToken: boolean;
  isFilled: boolean;
  getCredentials: () => Credentials;
  handleIdInstanceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleApiTokenChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleShowToken: () => void;
}

/**
 * Управляет полями ввода токенов: значения, показ/скрытие токена.
 */
export function useCredentialsInput(): CredentialsInputModel {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [showToken, setShowToken] = useState(false);

  const handleIdInstanceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIdInstance(event.target.value);
  }, []);

  const handleApiTokenChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setApiTokenInstance(event.target.value);
  }, []);

  const toggleShowToken = useCallback(() => {
    setShowToken((value) => !value);
  }, []);

  const getCredentials = useCallback(
    (): Credentials => ({
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    }),
    [idInstance, apiTokenInstance],
  );

  return {
    idInstance,
    apiTokenInstance,
    showToken,
    isFilled: idInstance.trim().length > 0 && apiTokenInstance.trim().length > 0,
    getCredentials,
    handleIdInstanceChange,
    handleApiTokenChange,
    toggleShowToken,
  };
}
