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

### 1. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory and add your NewsAPI.org API key:
   ```
   PORT=5000
   NEWS_API_KEY=your_news_api_key_here
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will start on `http://localhost:5000`

### 2. Frontend Setup

1. In a new terminal, navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will open in your default browser at `http://localhost:3000`

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
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # React source files
│       ├── components/    # Reusable components
│       ├── App.js         # Main App component
│       └── index.js       # Entry point
└── server/                # Node.js backend
    ├── server.js          # Express server
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

## License

This project is open source and available under the [MIT License](LICENSE).
