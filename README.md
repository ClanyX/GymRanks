# Gym Ranking

**Gym Ranks** je webová aplikace, kde si můžeš zapisovat své **PR (Personal Records / osobní rekordy)** z posilovny a pak je **porovnávat s ostatními**, dělat si **žebříčky**, sledovat progres.

Cíl je jednoduchý: mít PRka na jednom místě a udělat z nich něco víc než jen poznámku v mobilu.

## Co aplikace řeší
- PRka se často ztratí v poznámkách / v hlavě / v tabulkách
- porovnání s kámoši je opruz a bez jednotného formátu
- chybí přehled: kdo má jaký bench, dřep, mrtvolu, shyby… a jak to roste v čase

## Funkce (aktuálně / plánovaně)
- Zápis a správa **PR** (např. bench / dřep / mrtvý tah / další cviky)
- **Žebříčky** podle cviku / období / skupiny (např. top 10 bench)
- **Porovnání** uživatelů a jejich výkonů
- **Grafy**

---

## Tech stack
- **SvelteKit + Vite**
- **Tailwind CSS** + **Flowbite** (UI komponenty)
- **Supabase** (auth + klient)
- **Drizzle ORM** + **PostgreSQL** (datová vrstva)

---

## Rychlý start

### Požadavky
- **Node.js** (doporučeně aktuální LTS)
- **pnpm** (repo používá `pnpm-lock.yaml`)

### Instalace
```bash
git clone https://github.com/ClanyX/Gym_Ranking.git
cd Gym_Ranking

pnpm install
```

### Spuštění (vývoj)
```bash
pnpm dev
```

### Build a preview
```bash
pnpm build
pnpm preview
```

---

## Skripty
- `pnpm dev` – vývojový server
- `pnpm build` – produkční build
- `pnpm preview` – preview produkčního buildu
- `pnpm check` / `pnpm check:watch` – Svelte/TS kontrola
- `pnpm lint` – prettier + eslint
- `pnpm format` – autoformátování přes prettier

---

## Proměnné prostředí (Supabase)
Projekt používá veřejné proměnné:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

Doporučení: vytvoř `.env` (nebo `.env.local`) a doplň hodnoty ze Supabase projektu.

Příklad:
```env
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
```

---

## Jak to (typicky) funguje
1. Uživatel se přihlásí.
2. Přidá si PRko pro konkrétní cvik (váha, datum…).
3. Appka to uloží a umožní:
   - zobrazit vlastní historii/progres,
   - porovnat se s ostatními,
   - vytvořit žebříčky (např. „Top bench tento měsíc“).

---

## Struktura projektu (orientačně)
- `src/` – zdrojové kódy aplikace
- `static/` – statické soubory
- `src/lib/supabase.ts` – Supabase klient pro browser
- `drizzle.config.ts` – konfigurace Drizzle

---

## Licence
**Apache License 2.0** (viz licence v repozitáři).