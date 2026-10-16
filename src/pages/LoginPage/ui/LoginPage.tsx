import { LoginForm } from '@/features/auth/ui/LoginForm/LoginForm';
import './LoginPage.scss';

export const LoginPage = () => {
  return (
    <div className='login-page'>
      <div className='login-page__card'>
        <div className='login-page__logo' aria-hidden='true'>
          ✈️
        </div>
        <h1 className='login-page__title'>Telegram Chat</h1>
        <p className='login-page__subtitle'>
          Войдите, указав данные инстанса GREEN API
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
