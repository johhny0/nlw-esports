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