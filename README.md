# SendNUIMessage

Como o aplicativo será um iframe, não será possível utilizar o SendNUIMessage
Para resolver este problema, você terá que aplicar uma técnica chamada [Long Polling](https://pt.stackoverflow.com/questions/254506/o-que-%C3%A9-long-polling)

```js
// Neste exemplo, trate esse arquivo como um módulo bus.js

// Você pode substituir isso por um EventEmitter ou Map<string, Set<Function>>
const handlers = {}

export function onNuiMessage(name, callback) {
  handlers[name] = callback
}

setTimeout(async () => {
  while (true) {
    const res = await fetch('http://seuscript/polling', { method: 'POST' })
    const messages = await res.json()

    for (const [event, data] of messages) {
      if (event in handlers) {
        handlers[event](data)
      }
    }
  }
})
```

```lua
-- Esta variável vai funcionar como uma fila de mensagens
local messages = {}

function SendNUIMessage(event, data)
  table.insert(messages, { event, data })
end

RegisterNUICallback('polling', function(_, cb)
  local timer = 0

  -- Vamos esperar 30 segundos, ou até alguma mensagem entrar na lista, o que acontecer primeiro
  while timer < 30 and #messages == 0 do
    Wait(100)
    timer = timer + 0.1
  end

  cb(messages)
  messages = {}
end)
```