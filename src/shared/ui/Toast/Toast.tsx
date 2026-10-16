import { useToastStore } from '@/shared/lib/toast';
import { cn } from '@/shared/lib/utils';
import './Toast.scss';

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);
  const remove = useToastStore((state) => state.remove);

  if (toasts.length === 0) return null;

  return (
    <div className='toast-container' role='region' aria-live='polite'>
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type='button'
          className={cn('toast', `toast--${toast.type}`)}
          onClick={() => remove(toast.id)}
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
