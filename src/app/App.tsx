import { useAuth } from '@/features/auth/model/useAuth';
import { LoginPage } from '@/pages/LoginPage/ui/LoginPage';
import { ChatPage } from '@/pages/ChatPage/ui/ChatPage';
import { ToastContainer } from '@/shared/ui/Toast/Toast';

export function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <ChatPage /> : <LoginPage />}
      <ToastContainer />
    </>
  );
}
