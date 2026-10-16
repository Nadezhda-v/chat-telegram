import { create } from 'zustand';

export type ToastType = 'error' | 'info' | 'success';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  push: (message: string, type?: ToastType) => void;
  remove: (id: number) => void;
}

let toastCounter = 0;
const TOAST_LIFETIME_MS = 5000;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  push: (message, type = 'error') => {
    const id = ++toastCounter;
    set({ toasts: [...get().toasts, { id, message, type }] });

    setTimeout(() => {
      set({ toasts: get().toasts.filter((toast) => toast.id !== id) });
    }, TOAST_LIFETIME_MS);
  },
  remove: (id) => set({ toasts: get().toasts.filter((toast) => toast.id !== id) }),
}));

/** Функция для показа уведомления вне React-компонентов. */
export function showToast(message: string, type: ToastType = 'error'): void {
  useToastStore.getState().push(message, type);
}
