import type { ChangeEvent } from 'react'

export interface IdInstanceFieldProps {
  value: string
  disabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
