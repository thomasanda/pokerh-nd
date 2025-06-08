# Pokerhånd Case - Amedia

Fullstack app som genererer en pokerhånd med 5 kort og viser hvilken verdi hånden har.

Lagrer tidligere genererte hender i en sqlite-database og gir mulighet til å sammenligen flere hender og vise hvilken hånd som er vinner.

For å kjøre appen lokalt:

- Klon repoet på din lokale maskin

- `CD` inn i mappen

- Bygget med Node22 - har du nvm installert kan du først kjøre `nvm use` i root eller installere versjon 22 av node

- `npm i`
- `echo 'DATABASE_URL="sqlite.db"' > .env`
- `npm run sqlite:migrate`
- `npm run dev`

Applikasjonen vil da være tilgjengelig på `localhost:3000`

Eventuelt kan man bruke docker:

`docker build -t my-app . && docker run --rm -p 3000:3000 my-app`

Applikasjonen er scaffoldet med [bati](https://batijs.dev/)

- Frontend-rammeverk: [Vike](https://vike.dev/)
- UI-rammeverk: React
- CSS: Tailwind
- UI-komponenter: shadcn
- Server: Express
- Database: sqlite
