import { ChatIcon } from '@/shared/icons'

export const ChatWindowEmpty = () => {
  return (
    <section className='chat-window chat-window--empty'>
      <div className='chat-window__placeholder'>
        <div className='chat-window__placeholder-icon'>
          <ChatIcon color='white'/>
        </div>
        <h2 className='chat-window__placeholder-title'>Выберите чат</h2>
        <p className='chat-window__placeholder-text'>
          Создайте новый чат по номеру телефона или выберите существующий в списке слева.
        </p>
      </div>
    </section>
  )
}
