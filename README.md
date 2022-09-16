# nlw-esports

## Backend

### Entities

#### Game

- id
- title
- bannerUrl

#### Ad

- id
- gameId
- name
- yearsPlaying
- discord
- weekDays
- hourStart
- hourEnd
- useVoiceChannel
- createdAt

#### Casos de Uso

- Listagem de games com contagem de anúncios
- Criação de novo anúncio
- Listagem de anúncio por game
- Buscar discord pelo ID do anúncio



#### Proximos

##### FrontEnd

- Implementar responsividade
- Slide nos games (keen-silder)
- Select dos jogos (Radix)
- WeekDay em multi-select, talvez (Radix)
- Validação dos campos (React Hook Form) 

##### Backend

- ZOD para validações

##### Features

- Login com Twitch
- Login com Discord