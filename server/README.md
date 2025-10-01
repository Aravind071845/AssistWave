## Backend — AssistWave API

### Tech stack

* Node.js + Express
* PostgreSQL (pg)
* passport (local + Google OAuth)
* bcrypt for password hashing
* express-session
* axios (for HERE API calls)
* twilio (for SMS)

### Purpose

The backend provides REST endpoints for: user signup/login (local and Google OAuth), profile updates, receiving emergency events (`device_id`, `latitude`, `longitude`, `heartRate`), sending notifications to relatives via Twilio, finding nearest hospitals via HERE Places API, and storing/retrieving reviews.

### Prerequisites

* Node.js and npm
* PostgreSQL

### Installation

```bash
cd server
npm install
cp .env.example .env   # fill values
```

### Environment variables

Create `.env` with the values for your environment. **Do not commit** this file. Example below:

```.env.example
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=YOUR_DB_PASSWORD
DB_PORT=5432
SESSION_SECRET=YOUR_SESSION_SECRET
CORS_ORIGIN=http://localhost:3000
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
PHONE_NUMBER=+1XXXXXXXXXX
HEART_RATE_LOW=actual_value
HEART_RATE_HIGH=actual_value
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK=http://localhost:8081/auth/google/callback
HERE_API_KEY=your_here_api_key
PORT=8081
```

### Database schema

Example SQL to create the `users` and `reviews` tables used by the app:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  device_id VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_num VARCHAR(30) NOT NULL,
  relative_num VARCHAR(30) NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150),
  rating INTEGER,
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Running the server (dev)

```bash
npm run dev   # or node src/index.js depending on scripts
```


### Security & best practices

* **Never commit `.env`** or secrets to VCS. Use a secret store in production (AWS Secrets Manager, GCP Secret Manager, Vault).
* **Rotate compromised secrets** immediately.
* Use a production-ready session store (Redis or connect-pg-simple) instead of the default MemoryStore.
* Set cookies with `httpOnly: true`, `secure: true` (in production) and `sameSite` appropriately.
* Limit CORS to the required origin(s) and enable `credentials: true`.
* Apply rate limiting to authentication endpoints (e.g. `express-rate-limit`).
* Validate and sanitize all incoming payloads.

### Troubleshooting

* If Twilio messages fail, check Twilio SID/Auth tokens and the phone number format.
* If HERE Places calls fail, verify `HERE_API_KEY` and request quotas.
* If Google OAuth fails, ensure `GOOGLE_CLIENT_ID`/`SECRET` and `CALLBACK` URL match the Google Cloud Console configuration.

---