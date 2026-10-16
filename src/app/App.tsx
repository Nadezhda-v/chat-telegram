import { useAuth } from '@/features/auth/model/useAuth';
import { LoginPage } from '@/pages/LoginPage/ui';
import { ChatPage } from '@/pages/ChatPage/ui';
import { ToastContainer } from '@/shared/ui';

export function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <ChatPage /> : <LoginPage />}
      <ToastContainer />
    </>
  );
}
