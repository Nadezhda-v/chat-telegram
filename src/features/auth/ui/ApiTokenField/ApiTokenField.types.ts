import type { ChangeEvent } from 'react';

export interface ApiTokenFieldProps {
  value: string;
  visible: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
}
