# News Updates App

A full-stack application that fetches and displays the latest news articles using React for the frontend and Node.js with Express for the backend.

## Features

- View top headlines from various news sources
- Filter news by country and category
- Responsive design that works on mobile and desktop
- Clean and modern user interface
- Real-time news updates

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)
- NewsAPI.org API key (free tier available)

## Setup Instructions

### 1. Backend Setup (Express)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add your settings:
   ```env
   PORT=5001
   NEWS_API_KEY=your_news_api_key_here
   JWT_SECRET=replace_with_a_strong_random_string
   REQUIRE_AUTH=false
   ```
   - `REQUIRE_AUTH=false` keeps the API public (no login needed).
   - Set `REQUIRE_AUTH=true` to require JWT auth.

4. Start the backend server (with auto-reload):
   ```bash
   npm run dev
   ```
   The server runs at `http://localhost:5001`.

### 2. Frontend Setup (React)

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create `frontend/.env` to control auth UI:
   ```env
   REACT_APP_REQUIRE_AUTH=false
   ```
   - Set to `true` to enable the login form and send the JWT in requests.

4. Start the development server:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000` or `:3001`.

## Getting a NewsAPI.org API Key

1. Go to [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add the API key to your `.env` file

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Project Structure

```
news-app/
├── frontend/               # React frontend
│   ├── public/            # Static files
│   └── src/               # React source files
│       ├── components/    # Reusable components
│       ├── App.js         # Main App component
│       └── index.js       # Entry point
└── backend/               # Node.js backend
    ├── server.js          # Express server with optional JWT auth
    └── .env               # Environment variables
```

## Dependencies

### Frontend
- React
- React DOM
- React Scripts
- Axios (for API requests)

### Backend
- Express
- CORS
- Axios
- Dotenv
- jsonwebtoken (only used when auth is enabled)
- bcryptjs (only used when auth is enabled)

## Auth Toggle

- Backend: set `REQUIRE_AUTH=true|false` in `backend/.env` and restart the backend.
- Frontend: set `REACT_APP_REQUIRE_AUTH=true|false` in `frontend/.env` and restart the frontend.
  - When enabled, the UI shows a login form and attaches the JWT token to requests.
  - Demo credentials (when enabled): `test` / `password123`.

## Ports and Proxy

- Frontend dev server defaults to `http://localhost:3000`. If that port is busy, CRA will prompt to use another (e.g., `3001`).
- The frontend proxy is configured to forward `/api/*` to the backend on `http://localhost:5001` (see `frontend/package.json`).

## Verify Auth Modes

### Auth OFF (Public)
1. backend/.env: `REQUIRE_AUTH=false`
2. frontend/.env: `REACT_APP_REQUIRE_AUTH=false`
3. Restart both servers.
4. Visit the UI and change filters; no login form is shown and articles load.
5. Direct API works without a token:
   - `http://localhost:5001/api/news?country=us&category=general&pageSize=10`

### Auth ON (Protected)
1. backend/.env: `REQUIRE_AUTH=true`
2. frontend/.env: `REACT_APP_REQUIRE_AUTH=true`
3. Restart both servers.
4. UI shows a login form. Log in with `test` / `password123`.
5. Articles load after login. Direct API without a token will respond `401`.

## Troubleshooting

- "Cannot GET /" on `http://localhost:5001`: normal. Only `/api/*` routes are served.
- "Authorization token missing": you hit a protected route without a token. Either log in through the UI (when auth ON) or turn auth OFF in env.
- Frontend env changes not taking effect: stop the dev server and run `npm start` again. CRA only loads `.env` at startup.
- Switched auth modes but still seeing old behavior: clear browser storage (localStorage) and hard refresh.
- NewsAPI errors (401/429): check `NEWS_API_KEY` in `backend/.env`, verify account status on newsapi.org, or try a different country/category. Backend logs will show upstream errors.
- Port 5001 already in use on Windows:
  - Find PID: `netstat -ano | findstr LISTENING | findstr :5001`
  - Kill: `taskkill /PID <pid> /F`

## Notes

- The active backend is under `backend/`. Any legacy `server/` folder can be ignored.

## License

This project is open source and available under the [MIT License](LICENSE).
