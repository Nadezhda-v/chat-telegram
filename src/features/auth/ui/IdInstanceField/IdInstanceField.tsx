import { Input } from '@/shared/ui/Input/Input'
import { IdInstanceFieldProps } from './IdInstanceField.types'

export const IdInstanceField = ({ value, disabled = false, onChange }: IdInstanceFieldProps) => {
  return (
    <div className='login-form__field'>
      <label className='login-form__label' htmlFor='idInstance'>
        idInstance
      </label>
      <Input
        id='idInstance'
        name='idInstance'
        value={value}
        onChange={onChange}
        placeholder='Например, 4100000000'
        autoComplete='off'
        inputMode='numeric'
        disabled={disabled}
        autoFocus
      />
    </div>
  )
}
