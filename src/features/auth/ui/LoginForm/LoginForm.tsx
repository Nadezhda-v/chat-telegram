import { Button, Spinner } from '@/shared/ui';
import { useCredentialsInput } from '@/features/auth/model/useCredentialsInput';
import { useLoginForm } from '@/features/auth/model/useLoginForm';
import { ApiTokenField, IdInstanceField } from '@/features/auth/ui';
import './LoginForm.scss';

export const LoginForm = () => {
  const credentialsInput = useCredentialsInput();
  const {
    idInstance,
    apiTokenInstance,
    showToken,
    handleIdInstanceChange,
    handleApiTokenChange,
    toggleShowToken,
  } = credentialsInput;

  const { isLoading, error, canSubmit, handleSubmit } = useLoginForm(credentialsInput);

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <IdInstanceField
        value={idInstance}
        onChange={handleIdInstanceChange}
        disabled={isLoading}
      />

      <ApiTokenField
        value={apiTokenInstance}
        visible={showToken}
        onChange={handleApiTokenChange}
        onToggleVisibility={toggleShowToken}
        disabled={isLoading}
      />

      {error && <p className='login-form__error'>{error}</p>}

      <Button type='submit' block disabled={!canSubmit}>
        {isLoading ? (
          <>
            <Spinner size={16} /> Проверка…
          </>
        ) : (
          'Войти'
        )}
      </Button>
    </form>
  )
}
