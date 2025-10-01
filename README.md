# AssistWave

---

## Project name

AssistWave — Web application for emergency contact & product usage management

## Short description

AssistWave is a web application that allows relatives or caregivers to register and manage accounts tied to a device ID.

When an emergency is reported (or when a monitored heart rate crosses configured thresholds), the backend triggers notifications to the registered relative and looks up nearby hospitals (via HERE Places API) to assist.

The web app also displays product usage simulation and allows users to rate the product.

> **Note:** Hardware implementation details are not included in this README.

## Features

* User signup / signin (email + password and Google OAuth)
* User profile management (phone number and relative number)
* Emergency reporting endpoint that accepts `device_id`, `latitude`, `longitude`, `heartRate` and triggers notifications (via Twilio) and hospital lookup (via HERE Places API)
* Reviews / ratings from authenticated users
* Dashboard with product simulation / demo video

## Architecture (high level)

* **Frontend:** React (SPA). Handles UI, authentication flows, and calls backend APIs.
* **Backend:** Node.js + Express. Handles authentication, sessions, database access (Postgres), Twilio, and HERE API integration.
* **Database:** PostgreSQL storing `users` and `reviews`.

## Repo structure

```
/ (repo root)
  /client     -> React app 
  /server     -> Express app 
  README.md
```

## Quickstart (dev)

1. Clone the repo

```bash
git clone <repo-url>
cd <repo>
```

2. Open two terminals — one for backend and one for frontend.

3. Backend

```bash
cd server
npm install
npm run dev            # or `node src/index.js` depending on your scripts
```

4. Frontend

```bash
cd client
npm install
npm run dev
```

## Security & secrets

* **Do not commit `.env` files**. Add `.env` to `.gitignore`.
* If any secret was accidentally committed, rotate the secret and purge history.

---