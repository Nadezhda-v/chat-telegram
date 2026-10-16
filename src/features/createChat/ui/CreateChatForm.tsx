
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { CreateChatFormProps } from './CreateChatForm.types';
import { useCreateChat } from '../model/useCreateChat';
import './CreateChatForm.scss';

export const CreateChatForm = ({ onCreated }: CreateChatFormProps) => {
  const {
    invalid,
    phone,
    setPhone,
    setInvalid,
    handleSubmit,
  } = useCreateChat({ onCreated });

  return (
    <form className='create-chat' onSubmit={handleSubmit}>
      <Input
        value={phone}
        onChange={(event) => {
          setPhone(event.target.value);
          if (invalid) setInvalid(false);
        }}
        placeholder='Номер в формате 79001234567'
        inputMode='tel'
        aria-label='Номер телефона получателя'
        invalid={invalid}
      />

      <Button type='submit' aria-label='Создать или открыть чат'>
        Начать
      </Button>
    </form>
  );
}
