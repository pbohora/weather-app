# Weather App

A production-quality weather forecast application built with React 19 and TypeScript. It shows current conditions, hourly forecasts, and a 7-day daily outlook with interactive charts.

---

# Demo

[Demo available here](https://project-py1jn.vercel.app/)

## Features

- Detects the user's location automatically via the browser Geolocation API and reverse-geocodes it to a city name
- Lets the user search any city worldwide with debounced autocomplete and recent search history
- Displays current weather: temperature, feels-like, wind, humidity, UV index, precipitation, visibility
- Shows an hourly forecast for the next 24 hours with precipitation probability
- Shows a 7-day daily forecast with an interactive temperature area chart
- Click on any day card to open a detailed breakdown with sunrise/sunset, min/max temps, and weather stats for that specific day
- Supports Celsius / Fahrenheit toggle, persisted across sessions
- Handles loading, error, and empty states throughout with skeleton screens

---

## Tech stack

| Layer        | Choice                   | Why                                                                 |
| ------------ | ------------------------ | ------------------------------------------------------------------- |
| UI           | React 19                 | Latest concurrent features, stable                                  |
| Language     | TypeScript 6             | End-to-end type safety from API response to render                  |
| Build        | Vite 8                   | Fast dev server, native ESM                                         |
| Styling      | SCSS Modules             | Scoped styles, global design token system via CSS custom properties |
| Server state | TanStack React Query v5  | Caching, loading/error states, deduplication out of the box         |
| Client state | Zustand v5               | Minimal boilerplate, persisted to localStorage                      |
| Routing      | React Router v7          | File-based layouts, nested routes                                   |
| HTTP         | Axios                    | Interceptors, consistent error handling                             |
| Validation   | Zod                      | Runtime schema validation of all API responses                      |
| Charts       | Recharts                 | Composable, responsive SVG charts                                   |
| Icons        | Lucide React             | Consistent icon set                                                 |
| Testing      | Vitest + Testing Library | Fast, Jest-compatible, co-located with Vite                         |

---

## APIs used

| API                                                                                 | Purpose                                     | Env var                  |
| ----------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------ |
| [Open-Meteo Forecast](https://open-meteo.com/en/docs)                               | Current weather + hourly + daily forecast   | `VITE_WEATHER_API_URL`   |
| [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)                | City search autocomplete                    | `VITE_GEOCODING_API_URL` |
| [Nominatim (OpenStreetMap)](https://nominatim.org/release-docs/latest/api/Reverse/) | Reverse geocoding (coordinates → city name) | `VITE_NOMINATIM_API_URL` |

---

## Environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

All variables have working defaults built in the app runs without a `.env` file. Override them only if you need to proxy through a custom backend.

```env
# Open-Meteo Weather API
VITE_WEATHER_API_URL=https://api.open-meteo.com/v1/forecast

# Open-Meteo Geocoding API
VITE_GEOCODING_API_URL=https://geocoding-api.open-meteo.com/v1/search

# Nominatim Reverse Geocoding API by OpenStreetMap
VITE_NOMINATIM_API_URL=https://nominatim.openstreetmap.org/reverse
```

---

## Local setup

### Prerequisites

- Node.js 20+
- npm 9+

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/pbohora/weather-app.git
cd weather-app

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available scripts

```bash
npm run dev           # Start dev server with HMR
npm run build         # Type-check + production build
npm run preview       # Preview the production build locally

npm run test          # Run all tests once (CI)
npm run test:watch    # Run tests in watch mode (development)
npm run test:coverage # Run tests with v8 coverage report

npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier format all files
```

---

## Folder structure

```
src/
├── app/                          # App shell
│   ├── App.tsx                   # Root: ErrorBoundary + Providers + Router
│   ├── providers.tsx             # QueryClientProvider
│   └── router.tsx                # Route definitions
│
├── features/                     # Feature modules (vertical slices)
│   ├── location/                 # City search + geolocation
│   │   ├── api/
│   │   │   ├── geocodingApi.ts          # Open-Meteo city search
│   │   │   ├── geocodingApi.types.ts    # Zod schema + inferred types
│   │   │   └── nominatimApi.ts          # Nominatim reverse geocoding
│   │   ├── components/
│   │   │   ├── LocationSearch/          # Search input with debounce
│   │   │   └── SearchSuggestions/       # Dropdown with suggested locations and skeleton loading
│   │   ├── hooks/
│   │   │   ├── useGeolocation.ts        # Browser geolocation → React Query
│   │   │   └── useLocationSearch.ts     # Debounced city search query
│   │   ├── store/
│   │   │   └── locationStore.ts         # Zustand: selected location + history
│   │   └── types/
│   │       └── location.types.ts
│   │
│   └── weatherDashboard/         # Weather display
│       ├── api/
│       │   ├── weatherApi.ts            # Open-Meteo fetch + Zod parse
│       │   └── weatherApi.types.ts      # Zod schema + inferred types
│       ├── components/
│       │   ├── CurrentWeather/          # Hero: temp, conditions, stats
│       │   ├── DailyForecast/           # 7-day cards + ForecastDetailModal
│       │   ├── HourlyForecast/          # 24-hour horizontal scroll
│       │   ├── TemperatureChart/        # Recharts area chart
│       │   ├── TemperatureDisplay/      # Large temp + feels-like + status
│       │   ├── UnitToggle/              # °C / °F pill toggle
│       │   ├── WeatherCard/             # Stat card: icon + label + value
│       │   ├── WeatherSkeleton/         # Full-page loading skeleton
│       │   └── WeatherStats/            # Grid of WeatherCards
│       ├── hooks/
│       │   └── useWeatherQuery.ts       # React Query wrapper for forecast API
│       ├── store/
│       │   └── weatherStore.ts          # Zustand: temperature unit
│       ├── types/
│       │   └── weather.types.ts         # Domain types: WeatherDomain, WeatherDay, etc.
│       ├── utils/
│       │   ├── formatWeather.ts         # Pure formatters: temp, wind, date, WMO codes
│       │   └── transformWeather.ts      # API response → domain model
│       └── index.tsx                    # WeatherDashboard page component
│
├── shared/                       # Cross-feature utilities
│   ├── api/
│   │   └── axiosInstance.ts      # Configured Axios client
│   ├── components/
│   │   ├── Dialog/               # Generic accessible modal shell
│   │   ├── EmptyState/           # Empty placeholder with icon + message
│   │   ├── ErrorBoundary/        # React class error boundary
│   │   ├── ErrorState/           # Error UI with optional retry button
│   │   ├── Layout/               # Page shell: Navbar + main + ErrorBoundary
│   │   ├── Navbar/               # Sticky nav: logo + search + unit toggle
│   │   ├── NotFound/             # 404 page
│   │   ├── ScrollButtons/        # Left/right scroll nav buttons
│   │   └── Skeleton/             # Shimmer loading block
│   ├── hooks/
│   │   ├── useDebounce.ts        # Generic debounce hook
│   │   ├── useHorizontalScroll.ts# Scroll container ref + scroll function
│   │   └── useScrolled.ts        # Tracks window scroll past a threshold
│   └── utils/
│       └── errorMessage.ts       # Standardized error message formatter
│
├── styles/                       # Global design system
│   ├── _variables.scss           # CSS custom properties: colors, type scale, glass tokens
│   ├── _mixins.scss              # SCSS mixins: typography, glass-card, flex, animations
│   ├── _typography.scss          # Base heading styles using token scale
│   ├── _reset.scss               # CSS reset
│   └── global.scss               # Body styles + global utility classes
│
└── test/
    ├── fixtures.ts               # Shared test data: locations, weather, daily forecast
    └── setup.ts                  # Vitest setup: jest-dom, matchMedia, ResizeObserver mocks
```

---

## Architecture decisions

### Feature-based folder structure

The project is organised as **vertical feature slices** (`features/location`, `features/weatherDashboard`) rather than horizontal layers (`components/`, `hooks/`, `services/`).

**Why:** A horizontal structure groups things by type, not by purpose. When you work on a feature you end up touching five different folders. A vertical slice keeps everything for one feature together — its API calls, types, components, hooks, and store — so you can understand and change a feature by looking in one place. The `shared/` directory holds only the things that genuinely cross feature boundaries.

### React Query for all server state

Every API call goes through React Query (`useWeatherQuery`, `useLocationSearch`, `useGeolocation`), including the browser Geolocation API which is wrapped in a Promise to fit the model.

**Why:** React Query gives caching, deduplication, background refetch, loading/error states, and DevTools visibility for free. The alternative — `useEffect` + `useState` — requires manually solving all of those problems and produces harder-to-test code.

Each query has a stale time tuned to how often its data actually changes:

| Query               | `staleTime` | Reason                                |
| ------------------- | ----------- | ------------------------------------- |
| `useWeatherQuery`   | 30 minutes  | Weather changes, but not every minute |
| `useLocationSearch` | `Infinity`  | City coordinates never change         |
| `useGeolocation`    | `Infinity`  | Position is captured once per session |

The `gcTime` (garbage collection) is 30 minutes for all queries — unused cache entries are evicted from memory after that window.

### Zustand for client state

Two Zustand stores handle client-only state: `weatherStore` (temperature unit) and `locationStore` (selected location + search history). Both are persisted to `localStorage` via the `persist` middleware.

**Why:** The alternative (React Context) re-renders all consumers on every change. Zustand is selector-based — components only re-render when the slice they subscribe to changes. The `persist` middleware means the user's city and unit preference survive a page refresh without any extra code.

### Zod for API validation

All API responses are parsed with Zod schemas before the data reaches the rest of the app. The HTTP client receives `unknown` and Zod narrows it to the typed domain model.

**Why:** TypeScript types disappear at runtime. Without Zod, a changed API field causes a silent `undefined` deep in a component. With Zod, the failure is immediate and at the network boundary — the right place to catch it.

### SCSS Modules + global design tokens

Component styles are scoped via SCSS Modules. Shared values (colors, typography scale, glass surface colors) live as CSS custom properties in `_variables.scss`. Repeated multi-property patterns live as SCSS mixins in `_mixins.scss`.

---

## Areas for improvement

- **E2E tests** — Vitest covers unit and integration. Playwright or Cypress tests for full user flows (search → select → view forecast) are missing.
  **API level tests** API level testing is missing. MSW could be used to mock the API responses.
- **Accessibility audit** — Keyboard navigation and screen reader testing beyond ARIA attributes hasn't been done systematically.
- **Hourly forecast range** — The hourly list is capped at 24 hours from now. Extending to 7 days of hourly data with virtual scroll would require a library like `@tanstack/react-virtual`.
