# Stock Market Data Viewer

A full-stack stock market data application built with Node.js, TypeScript, React, and Recharts.

The application allows a user to enter a stock symbol and retrieve intraday stock data from Yahoo Finance for the past month. The backend groups the intraday data by trading day and calculates daily average low and high prices along with total daily volume. The frontend displays the processed data in both a table and a line chart.

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- Yahoo Finance public API

### Frontend
- React
- TypeScript
- Vite
- Recharts
- CSS

## Project Structure

```text
prometheus-stock-app/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── README.md
├── PROMPT_LOG.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure the following are installed:

* Node.js
* npm
* Git

You can verify the installations with: 

```text
node --version
npm --version
git --version
```


## Installation

Clone the respository:
```text
git clone https://github.com/balajihp126/Prometheus-stock-app.git
cd prometheus-stock-app 
```

### Backend
Navigate to the backend directory:

```text
cd backend
npm install
npm run dev
```
The backend should run at:
```text
http://localhost:3000
```

### Frontend
Open a second terminal and navigate to the frontend directory:
```text
cd frontend
npm install
npm run dev
```
Vite will display the local frontend URL in the terminal, typically:
```text
http://localhost:5173
```

## Usage

1. Start both the backend and frontend development servers.
2. Open the frontend in a browser.
3. Enter a stock ticker symbol such as:
```text
AAPL
TSLA
MSFT
```
4. Select Search or press Enter.
5. The application will retrieve and display stock data from the past month.

The application displays:

* Daily average low price
* Daily average high price
* Total daily trading volume
* A line chart showing average low and high prices over time
* A table containing the processed daily values

The table is displayed in reverse chronological order, with the most recent trading day first.

## API
```text
GET /api/stocks/:symbol
```

Example:
```text
GET http://localhost:3000/api/stocks/TSLA
```
The backend queries Yahoo Finance using 15-minute intraday intervals from the previous month and groups the results by trading day.

```
[
    {
        "day": "Sep 25, 2026",
        "lowAverage": 441.1234,
        "highAverage": 446.5678,
        "volume": 48726193
    }
]
```


## Architecture / Design Decisions

The application is separated into a React frontend and an Express backend, a Node.js web application framework.

The frontend does not communicate directly with Yahoo Finance. Instead, it sends a request to the backend API using the requested stock symbol.

The backend is responsible for:

1. Receiving the stock symbol.
2. Requesting intraday stock data from Yahoo Finance.
3. Validating the returned data.
4. Converting timestamps to the America/New_York timezone.
5. Grouping 15-minute observations by trading day.
6. Calculating the average daily low and high prices.
7. Summing daily trading volume.
8. Returning a simplified JSON response to the frontend.

Stock data retrieval and aggregation logic is separated from the Express route to keep the application easier to maintain and test.

The frontend uses the same processed dataset for both the chart and the table rather than making separate API requests.

## Error Handling

The application includes basic handling for invalid or failed requests.

The backend checks for:

1. Failed HTTP requests to Yahoo Finance
2. Missing Yahoo Finance results
3. Missing quote data
4. Null values within individual stock observations
5. Responses containing no usable stock data

Individual intraday observations containing incomplete values are skipped during aggregation.

The frontend displays an error message when stock data cannot be retrieved.

## Testing

Backend tests focus on the stock-data aggregation logic.

Tests include cases such as:

1. Grouping multiple intraday observations into one trading day
2. Calculating average low prices correctly
3. Calculating average high prices correctly
4. Summing daily volume
5. Keeping separate trading days independent
6. Ignoring observations containing null values

Run backend tests with:

```
cd backend
npm test
```

## Build

To verify the backend TypeScript build:
```
cd backend
npm run build
```
To build the frontend:
```
cd frontend
npm run build
```
## Assumptions

* Stock symbols correspond to securities supported by Yahoo Finance.
* Trading days are grouped using the America/New_York timezone.
* Intraday records containing incomplete price or volume information are excluded from aggregation.
* Daily low and high averages are rounded to four decimal places.
* Daily volume is calculated by summing the volume from each valid 15-minute interval.
* The application is intended as an MVP and does not currently persist stock data.

## AI Collaboration

AI tools were used during development for learning unfamiliar TypeScript and React concepts, reviewing implementation choices, debugging issues, and discussing maintainability improvements.

The complete record of AI-assisted development decisions is available in:
```
PROMPT_LOG.md

```
The final implementation was reviewed and modified manually, with the developer responsible for all code included in the project.