# Airport Information API

## Description

The **Airport Information API** is a backend service built using **Node.js, TypeScript, Express, and SQLite with TypeORM**. It provides information about airports based on **IATA codes**. The API utilizes caching with **NodeCache** to enhance performance and reduce redundant database queries.

## Features

- Fetch airport details using IATA codes
- Efficient caching mechanism to improve response time
- Logging system to track API requests and responses
- Uses **SQLite** database with **TypeORM** for structured data management
- Deployed on **Render** for easy access and scalability

## Technologies Used

- **Node.js**
- **TypeScript**
- **Express.js**
- **SQLite** (via TypeORM)
- **NodeCache** (for caching responses)
- **Render** (for deployment)
- **Winston** (for logging)

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v20 or later)
- **npm** or **yarn**

### Steps to Set Up Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/AirportInformationAPI.git
   cd AirportInformationAPI
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   DATABASE_PATH=airports.db
   CACHE_TTL=900
   NODE_ENV=info
   ```
4. Run database migrations (if applicable):
   ```sh
   npm run typeorm migration:run
   ```
5. Start the server:
   ```sh
   npm run dev
   ```
   The server will run at `http://localhost:5000`.

## API Endpoints

### Fetch Airport Data

**GET /airport/:iata_code**

- Retrieves airport information using an IATA code.
- **Example Request:**
  ```sh
  GET http://localhost:5000/airport/AAA
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "iata_code": "AAA",
    "name": "Anaa Airport",
    "country": "French Polynesia",
    "latitude_deg": -17.05,
    "longitude_deg": -145.416
  }
  ```

### Fetch Logs

**GET /logs/api**

- Fetches API request logs.

**GET /logs/server**

- Fetches server logs.
