# TPF Dashboard

Rozwiązanie: aplikacja React + Vite z routingiem, Firebase Authentication, analityką Google Analytics oraz Hotjar.

## Zawartość projektu

- `src/App.jsx` - główny komponent z routingiem i inicjalizacją Hotjar + Google Analytics
- `src/pages/` - osobne strony dla każdego widoku: `LoginPage`, `DashboardPage`, `EntriesPage`, `ReportsPage`, `ProfilePage`, `NotFoundPage`
- `src/components/` - komponenty wielokrotnego użycia: `Navbar`, `Button`, `TextInput`, `Card`, `ProtectedRoute`, `AnalyticsListener`
- `src/firebaseAuth.js` - logika Firebase Authentication
- `src/firebaseConfig.js` - konfiguracja Firebase z wykorzystaniem zmiennych środowiskowych
- `src/styles/global.css` - kompletne style aplikacji

## Funkcjonalności

- Nawigacja między ekranami za pomocą React Router
- Logowanie i rejestracja użytkownika z Firebase Email/Password
- Zabezpieczone trasy dla panelu aplikacji
- Integracja Google Analytics przy przejściu między podstronami
- Integracja Hotjar przy starcie aplikacji
- Estetyczny, ciemny interfejs z układem kart i paneli

## Struktura widoków

- `/login` - ekran logowania / rejestracji
- `/` - dashboard główny
- `/entries` - dodawanie i lista wpisów
- `/reports` - raporty i metryki
- `/profile` - dane użytkownika i wylogowanie
- `*` - strona 404 dla nieistniejących ścieżek

## Konfiguracja środowiska

1. Skopiuj plik `.env.example` do `.env`
2. Wypełnij wartości z Firebase i Google Analytics / Hotjar:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_HOTJAR_SITE_ID=1234567
VITE_HOTJAR_VERSION=6
```

3. Zainstaluj zależności:

```bash
npm install
```

4. Uruchom lokalnie:

```bash
npm run dev
```

## Deploy

Projekt można wypchnąć na darmową platformę hostującą, np. Vercel, Netlify, Railway lub GitHub Pages.

Przykładowe kroki:

1. Wybierz darmowy serwis (Netlify / Vercel / Railway)
2. Podłącz repozytorium
3. Ustaw zmienne środowiskowe z `.env`
4. Ustaw polecenie budowania: `npm run build`
5. Ustaw katalog publikacji: `dist`

## Hotjar i Google Analytics

Aplikacja inicjalizuje:

- Hotjar w `src/App.jsx` za pomocą `@hotjar/browser`
- Google Analytics w `src/App.jsx` za pomocą `react-ga4`
- pageviewy w `src/components/AnalyticsListener.jsx`

## Dokumentacja i zrzuty ekranu

Dodaj zrzuty ekranu aplikacji do folderu `screenshots/` i wklej je tutaj w README.

- `screenshots/dashboard.png`
- `screenshots/login.png`
- `screenshots/hotjar.png`
- `screenshots/analytics.png`

> Uwaga: w katalogu `screenshots/` znajduje się plik `.gitkeep` jako miejsce do umieszczenia obrazków.
