# Работа с пользователем, сессии



В этой задаче вам потребуется реализовать сразу несколько вещей, которые позволят нам работать с
пользовательскими запросами: понимать от какого пользователя именно пришел запрос, ограничивать 
доступ к некоторым эндпойнтам без аутентификации и т.д.

## Сессии

Сессия в нашем случае - это ничто иное, как документ в базе данных, который хранит связь между 
токеном сессии (который хранится в клиентском приложении) и документом соответствующего 
пользователя. В `mongoose` подобные связи реализуются следующим образом:
1. Первым делом в документе в качестве значения типа поля указывается `ObjectId` (чтобы в базе 
хранился идентификатор документа), и дополнительно указывается свойство `ref`, в котором хранится 
имя модели, к которой объявляется связь (таким образом, мы можем связывать документы как одной и той
же коллекции, так и разных). В нашем случае модель `Session` хранит в поле `user` идентификатор 
пользователя, поэтому объявление поля выглядит следующим образом:

```js
user: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'User',
}
```

2. Выполнить поиск по коллекции `sessions` мы можем как обычно с помощью функций `find` или 
`findOne`, однако и в том, и в другом случае в каждом документе `sessions` поле `user` будет 
содержать лишь идентификатор, но не объект пользователя. Иногда этого вполне достаточно (если нам не
нужна информация из связной модели), но если это не так - мы можем с помощью функции `populate` 
"развернуть" идентификатор в соответствующую модель. Запрос может выглядеть так:

```js
const session = await Session.findOne({token: 'token'}).populate('user');
```
В этом случае в свойстве `session.user` будет находиться целиком объект пользователя.
 
Начнём мы с реализации функции `ctx.login`, которая будет вызываться с объектом пользователя и 
должна возвращать токен сессии, которую эта функция будет создавать в процессе. Необходимый 
middleware уже подключен в файле `app.js`, осталось реализовать в этой функции создание нового 
документа `Session`, передав в качестве значений созданный токен, идентификатор пользователя, а 
также время последнего визита - в данном случае это текущая дата.
В базе данных для коллекции `sessions` будет создан специальный индекс `expires`, который будет 
автоматически удалять сессии, у которых поле `lastVisit` содержит значение больше 7 дней. Таким 
образом пользователь, который неделю не заходил на наш сайт вынужден будет логиниться вновь. Но при
каждом заходе значение будет обновляться - т.е. при регулярном использовании сайта пользовательская
сессия удаляться не будет.


## Проверка сессионного токена

Следующим шагом добавим проверку передаваемого токена, для этого нам надо убедиться в том, что если
пользователь передал токен, то ему соответствует документ сессии в базе данных. В этом случае 
необходимо создать свойство `ctx.user`, соответствующее объекту пользователя этой сессии (чтобы все
последующие middleware могли использовать это значение). Например, обработчик запроса `/me` лишь
возращает данные текущего пользователь в теле ответа, не делая никаких проверок самостоятельно.
Обратите внимание, если пользователь передал токен, для которого нет сессии в базе данных - мы 
должны вернуть ошибку с кодом `401` (Unauthorized).
Все действия необходимо произвести в middleware, объявленом в файле `app.js`. Обратите внимание,
этот middleware объявляется исключительно для запросов, которые касаются `/api`, мы не хотим 
проверять вообще все запросы, но лишь те, которые относятся к клиент-серверному взаимодействию.
Таким образом, логика должна быть следующей:
1. Проверить в запросе наличие заголовка `Authorization` (его может и не быть - просто вызываем 
следующий в цепочке middleware).
2. Получить из значения заголовка токен (формат этого заголовка следующий - `Bearer %token%`). Проще
всего это сделать, разделив значение по пробелу с помощью функции `.split()` и взяв второй элемент 
получившегося массива. Если токена нет по какой-то причине - просто вызываем следующий middleware,
игнорируя наличие заголовка.
3. Выполнить запрос к базе данных с поиском сессии, к которой относится пользовательский токен, 
"дополнив" объект сессии объектом пользователя с соответствующим `id` (сделать это можно с помощью
функции `.populate`).
Если сессии нет - то мы должны вернуть клиенту ошибку со статусом `401` и текстом 
`Неверный аутентификационный токен`.
4. На данном этапе мы нашли необходимую сессию и знаем от какого именно пользователя пришел запрос,
поэтому мы можем продолжить выполнение обработки запроса, однако сделав перед этим некоторые 
полезные действия:
    - в документе сессии стоит обновить поле `lastVisit`, проставив текущую дату
    - записав объект пользователя в свойство `ctx.user` 
 

## Защищенные ресурсы

В нашем приложении появился новый эндпойнт `/api/me`, который возвращает информацию о текущем 
пользователе. Важно отметить, что запрос на этот эндпойнт может сделать только аутентифицированный
пользователь. В будущем подобных защищенных ресурсов будет становится больше и для того, чтобы не 
делать проверку в каждом из них имеет смысл вынести логику в отдельный middleware, который затем мы
будем подключать по мере необходимости.
Ваша задача как раз и состоит в том, чтобы:
1. Реализовать функцию в модуле `lib/mustBeAuthenticated` таким образом, чтобы она возвращала ошибку
со статусом `401` и текстом `'Пользователь не залогинен'` если пользователь не залогинен 
(отсутствует свойство `ctx.user`) или вызывала следующий обработчик, если все в порядке.
2. Подключить получившийся middleware в цепочку обработки запроса `router.get('/me', ...)`.  
