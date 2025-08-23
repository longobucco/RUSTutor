# RUSTutor

RUSTutor è una piattaforma interattiva per l’apprendimento del linguaggio di programmazione Rust. Il progetto offre una raccolta di capitoli teorici, esercizi pratici, flashcard e statistiche di avanzamento per aiutare studenti e appassionati a migliorare la propria conoscenza di Rust in modo graduale e coinvolgente.

## Funzionalità principali

- **Capitoli teorici**: Ogni capitolo copre un argomento chiave del linguaggio Rust, con spiegazioni dettagliate e esempi di codice.
- **Esercizi interattivi**: Metti alla prova le tue competenze con esercizi pratici e soluzioni guidate.
- **Flashcard**: Ripassa i concetti fondamentali tramite flashcard tematiche.
- **Progressi e statistiche**: Monitora il tuo avanzamento e visualizza le statistiche di apprendimento.
- **Interfaccia moderna**: UI intuitiva e responsiva, ottimizzata per desktop e mobile.

## Come usare il progetto

### Prerequisiti

- Node.js (consigliata versione 18+)
- pnpm, npm o bun come package manager

### Installazione

1. Clona il repository:
   ```sh
   git clone https://github.com/longobucco/RUSTutor.git
   cd RUSTutor/learning-hub
   ```
2. Installa le dipendenze:
   ```sh
   npm install
   # oppure
   pnpm install
   # oppure
   bun install
   ```

### Avvio dell’applicazione

Per avviare il progetto in modalità sviluppo:

```sh
npm run dev
# oppure
pnpm dev
# oppure
bun run dev
```

L’app sarà accessibile su `http://localhost:5173` (o porta indicata in console).

### Struttura del progetto

- `src/`: codice sorgente dell’applicazione
  - `components/`: componenti UI riutilizzabili
  - `data/`: dati statici (capitoli, esercizi, flashcard)
  - `hooks/`: custom hooks React
  - `pages/`: pagine principali dell’app
  - `types/`: definizioni TypeScript
- `public/`: risorse statiche
- `README.md`: questa guida

## Contribuire

1. Forka il repository e crea una branch dedicata.
2. Implementa le modifiche e apri una pull request.
3. Segnala bug o suggerimenti tramite le Issues di GitHub.

## Licenza

Questo progetto è distribuito sotto licenza MIT.
