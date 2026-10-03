**Ci sono tre cartelle principali**

1. `databse/`: Database PostgreSQL gestito con Docker Compose.
2. `app-api/`: Server backend REST API (Node.js, Express, TypeScript).
3. `app/`: Client frontend Web (Angular).

## Ordine di Avvio

L'applicazione deve essere avviata seguendo rigorosamente quest'ordine:

```
1. Database (PostgreSQL)  -->  2. REST API (Porta 4000)  -->  3. Frontend UI (Porta 4200)
```

---

---

### Avvio del Database (`databse/`)

1. Apri un terminale ed entra nella cartella del database:

```bash
cd databse
```

2. Crea la rete Docker condivisa (necessaria solo al primo avvio):

```bash
docker network create database_network
```

3. Avvia il container PostgreSQL in background tramite Docker Compose:

```bash
docker compose up -d
```

4. **Verifica il caricamento delle tabelle**:  
   Assicurati che lo script di inizializzazione (`db.sql`) abbia popolato correttamente il database:

```bash
# Controlla che le tabelle siano presenti
docker exec -it postgres psql -U postgres -d unive -c "\dt"
```

---

### Avvio del Server REST API (`app-api/`)

1. Apri un secondo terminale ed entra nella cartella dell'API:

```bash
cd app-api
```

2. Installa le dipendenze (se non già presenti):

```bash
npm install
```

3. Avvia il server backend in modalità sviluppo:

```bash
npm run dev
```

Il server REST API sarà attivo su: `http://localhost:4000`.

---

### Avvio dell'Applicazione Frontend (`app/`)

1. Apri un terzo terminale ed entra nella cartella dell'app Angular:

```bash
cd app
```

2. Installa le dipendenze (se non già presenti):

```bash
npm install
```

3. Avvia l'interfaccia utente:

```bash
npm start
```

4. Apri il browser all'indirizzo:  
   `http://localhost:4200`
