## Frontend — AssistWave UI

### Tech stack

* React
* React Router
* axios
* Tailwind CSS
* react-slick (carousel)
* lucide-react / react-icons

### Purpose

The frontend provides the user-facing UI for registration, login, dashboard, profile management, reviews, and Google OAuth initiation. It communicates with the backend API to authenticate users and to send/receive application data.

### Prerequisites

* Node.js and npm
* Running backend API (see backend README)

### Getting started (development)

1. Install dependencies

```bash
cd client
npm install
```

2. Environment variables
   Create `.env` (never commit it)

3. Start dev server

```bash
npm run dev
```

### Important notes

* The frontend must never contain secret keys or sensitive credentials. Any API key that must be public should be restricted by domain/referrer in the provider console.
* Use an axios instance with `withCredentials: true` when relying on http-only session cookies from backend.
* For internal SPA routes, use `react-router`'s `<Link>` to prevent full-page reloads.

### CORS and Cookies

* When the frontend calls the backend and the backend uses session cookies, set `axios.defaults.withCredentials = true` or use an axios instance configured with `withCredentials`.
* Backend must configure CORS to allow the frontend origin and set `Access-Control-Allow-Credentials: true`.

### Testing

* Manual: Use the UI to register, login, update profile, trigger review submissions.
* Automated: Add tests with your preferred testing library (React Testing Library / Jest).

### Deployment

* Build the app (`npm run build`)

---
