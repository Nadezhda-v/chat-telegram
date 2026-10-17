# Telegram Chat (GREEN API)

Одностраничное веб-приложение — мессенджер для отправки и получения **текстовых**
сообщений через Telegram с использованием сервиса [GREEN API](https://green-api.com/telegram).

## Стек

**React 18**, **TypeScript**, **SCSS**, **Axios**, **Zustand**, **Vite**

## Быстрый старт

```bash
git clone https://github.com/Nadezhda-v/chat-telegram.git
npm install
npm run dev      # http://localhost:5173
```

Сборка и проверка типов:

```bash
npm run build      # сборка
npm run typecheck  # только проверка типов
npm run preview    # предпросмотр production-сборки
```

## Как получить `idInstance` и `apiTokenInstance`

1. Зарегистрируйтесь в личном кабинете GREEN API: https://console.green-api.com
2. Создайте инстанс **Telegram** (кнопка «Создать инстанс»).
3. На странице инстанса скопируйте значения:
   - `idInstance` — числовой идентификатор инстанса;
   - `apiTokenInstance` — токен инстанса.
4. В личном кабинете откройте настройки инстанса и:
   - **очистите `webhookUrl`** (оставьте поле пустым), чтобы работало получение
     уведомлений через HTTP API;
   - включите получение уведомлений о входящих сообщениях (`incomingWebhook`);
   - при необходимости включите уведомления об отправленных сообщениях (`outgoingWebhook`).
5. Авторизуйте инстанс в Telegram (скан QR-кода на странице инстанса).

Инструкция: https://green-api.com/telegram/docs/before-start/

## Пользовательский сценарий

1. Открыть приложение → ввести `idInstance` и `apiTokenInstance` → «Войти».
   Данные сохраняются в `localStorage` и подставляются при следующих заходах.
2. Ввести номер получателя в международном формате (например `79001234567`) → «Начать».
   Создаётся новый чат или открывается уже существующий.
3. Отправить текстовое сообщение — оно сразу появляется в переписке.
4. Получатель отвечает в Telegram — ответ появляется в интерфейсе в реальном времени
   без перезагрузки страницы (long polling).
5. Кнопка «Выйти» очищает `localStorage` и возвращает на экран ввода учётных данных.

## Используемые методы GREEN API

| Действие            | Метод                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Проверка данных     | `GET /waInstance{idInstance}/getStateInstance/{apiTokenInstance}`                                          |
| Отправка сообщения  | `POST /waInstance{idInstance}/sendMessage/{apiTokenInstance}`                                              |
| Приём уведомления   | `GET /waInstance{idInstance}/receiveNotification/{apiTokenInstance}?receiveTimeout=20`                     |
| Удаление уведомления| `DELETE /waInstance{idInstance}/deleteNotification/{apiTokenInstance}/{receiptId}`                         |

- Отправка: https://green-api.com/telegram/docs/api/sending/SendMessage/
- Приём: https://green-api.com/telegram/docs/api/receiving/technology-http-api/
- Формат текстового уведомления: https://green-api.com/telegram/docs/api/receiving/notifications-format/incoming-message/TextMessage/

`chatId` для номера телефона формируется как `79001234567@c.us`.

## Архитектура

Проект построен по методологии **Feature-Sliced Design**:

```
src/
├─ app/                 # инициализация приложения, глобальные стили
│  ├─ App.tsx
│  └─ styles/
├─ pages/               # страницы
├─ widgets/             # крупные самостоятельные блоки UI
│  ├─ ChatList/         # список чатов + форма создания чата
│  ├─ ChatWindow/       # область переписки
│  └─ MessageInput/     # поле ввода и отправки
├─ features/            # пользовательские сценарии
│  ├─ auth/             # авторизация
│  ├─ createChat/       # создание / открытие чата
│  ├─ sendMessage/      # отправка
│  └─ receiveMessages/  # long polling
├─ entities/            # бизнес-сущности
│  ├─ session/          # учётные данные (Zustand + localStorage)
│  ├─ chat/             # модель чата и store
│  └─ message/          # модель сообщения и пузырь
└─ shared/              # переиспользуемый код
   ├─ api/              # axios-клиент GREEN API, типы ответов, обработка ошибок
   ├─ config/           # константы
   ├─ lib/              # helpers
   └─ ui/               # ui-kit
```

### Long polling

`features/receiveMessages/model/useLongPolling.ts` циклически вызывает
`receiveNotification`, обрабатывает уведомление и подтверждает его через
`deleteNotification`. Цикл отменяется через `AbortController`:

- при размонтировании компонента (cleanup `useEffect`);
- при выходе из аккаунта (смена `credentials` в store → перезапуск/остановка эффекта).

При сетевой ошибке показывается уведомление и выполняется повторная попытка через 3 секунды.

### Обработка ошибок и пустые состояния

- Ошибки сети и API (неверные учётные данные, лимиты, отсутствие соединения)
  показываются пользователю: на экране входа и через всплывающие уведомления.
- Предусмотрены пустые состояния: «нет чатов», «нет сообщений», «выберите чат»,
  индикаторы загрузки и статус соединения (на связи / переподключение).

## Адаптивность

- **Desktop**: две колонки — список чатов и область переписки.
- **Планшет / мобильный (≤ 900px)**: одноколоночный режим с переключением между
  списком чатов и окном переписки (кнопка «Назад»).
