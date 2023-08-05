# Theatre Booking API

The Theatre Booking API provides endpoints to access and manage movie showtimes and seat bookings in various theatres. Users can view showtimes for the next 7 days, select a specific date to see the available movies and their showtimes in a chosen theatre, and book seats for a show.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Caching](#caching)
- [Database Configuration](#database-configuration)

## Getting Started

### Prerequisites

To run the API, you'll need the following installed on your system:

- Node.js (https://nodejs.org)
- MySQL Server (https://www.mysql.com/)
- Redis (https://redis.io/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SanketSal/BookmyshowAPI.git
cd theatre-booking-api
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the MySQL and Redis configuration:

   - Open the `models.js` file in the `models` directory and update the database connection details (`your_database_name`, `your_mysql_username`, and `your_mysql_password`).

   - Make sure your Redis server is running on the default port (6379). If not, update the Redis configuration in the `helpers.js` file.

4. Start the API:

```bash
npm start
```

By default, the API will run on http://localhost:3000. You can change the port by setting the `PORT` environment variable.

## API Endpoints

The API provides the following endpoints:

1. **Get Dates for a Theatre**

   - `GET /theatres/:theatre_id/dates`

   - Returns the dates of the next 7 days for a given theatre.

2. **Get Movies and Showtimes**

   - `GET /theatres/:theatre_id/movies/:show_date`

   - Returns the available movies and their showtimes for a specific date and theatre.

3. **Book Seats**

   - `POST /theatres/:theatre_id/movies/:showtime_id/book`

   - Books seats for a given theatre, movie showtime, and selected seats.

## Caching

The API uses Redis as a caching mechanism to store frequently accessed data and reduce the number of database queries. The following data is cached:

- Theatre dates for the next 7 days for each theatre.
- Movies and showtimes for a specific date and theatre.
- Showtime details, including available seats and booking status.

The caching helps improve API response times and reduces the load on the database.

## Database Configuration

The API uses MySQL as the database. To set up the database, ensure you have a running MySQL server and update the database connection details in the `models.js` file.

The required database tables and associations will be automatically created and synced when the API starts.
