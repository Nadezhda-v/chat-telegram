import { Input } from '@/shared/ui/Input/Input'
import { ApiTokenFieldProps } from './ApiTokenField.types'

export const ApiTokenField = ({
  value,
  visible,
  disabled = false,
  onChange,
  onToggleVisibility,
}: ApiTokenFieldProps) => {
  return (
    <div className='login-form__field'>
      <label className='login-form__label' htmlFor='apiTokenInstance'>
        apiTokenInstance
      </label>
      <div className='login-form__token'>
        <Input
          id='apiTokenInstance'
          name='apiTokenInstance'
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder='Токен инстанса'
          autoComplete='off'
          disabled={disabled}
        />
        <button
          type='button'
          className='login-form__toggle'
          onClick={onToggleVisibility}
          tabIndex={-1}
        >
          {visible ? 'Скрыть' : 'Показать'}
        </button>
      </div>
    </div>
  )
}
