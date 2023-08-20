# BookMyShow API

Welcome to the BookMyShow API! This API provides a backend for managing theatres, movies, showtimes, seat bookings, and more. It also allows users to retrieve movie details, add and retrieve comments and ratings, and search for movies and theatres with filters.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Retrieve Movie Details](#retrieve-movie-details)
  - [Comments and Ratings](#comments-and-ratings)
  - [Search Movies and Theatres](#search-movies-and-theatres)
- [Configuration](#configuration)
- [Database](#database)
- [Redis](#redis)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MySQL database for theatre, movie, showtime, and seat data.
- MongoDB for comments and ratings data.
- Redis for caching data.
- Clone this repository to your local machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bookmyshow-api.git
   ```

2. Install dependencies:

   ```bash
   cd bookmyshow-api
   npm install
   ```

3. Set up your database configurations in the `.env` file.

4. Start the API server:

   ```bash
   npm start
   ```

## API Endpoints

### Retrieve Movie Details

#### `GET /movies/:movie_id/details`

Retrieve static movie details such as Name, Cast, Crew, Movie Plot, Runtime, Language, Genre, etc.

### Comments and Ratings

#### Add a Comment

#### `POST /movies/:movie_id/comments`

Add a comment for a specific movie.

**Request Body:**

```json
{
  "text": "Your comment here"
}
```

#### Get Comments

#### `GET /movies/:movie_id/comments`

Retrieve comments for a specific movie.

#### Add a Rating

#### `POST /movies/:movie_id/ratings`

Add a rating for a specific movie.

**Request Body:**

```json
{
  "rating": 4.5
}
```

#### Get Ratings

#### `GET /movies/:movie_id/ratings`

Retrieve ratings for a specific movie.

### Search Movies and Theatres

#### `GET /search?q=:query&language=:language&genre=:genre&format=:format`

Search for movies and theatres with filters.

**Query Parameters:**

- `q`: Search query (required)
- `language`: Language filter (optional)
- `genre`: Genre filter (optional)
- `format`: Format filter (optional)

## Configuration

Configure your application by setting the necessary environment variables in the `.env` file. Example:

```plaintext
PORT=3000
DATABASE_URL=mysql://your-db-username:your-db-password@localhost:3306/your-database-name
MONGODB_URI=mongodb://localhost:27017/bookmyshow
REDIS_URL=redis://localhost:6379
```

## Database

This application uses MySQL for theatre, movie, showtime, and seat data, and MongoDB for comments and ratings data. Ensure you have both databases set up and configured with appropriate schemas.

## Redis

Redis is used for caching data to improve API response times. Make sure you have Redis installed and running on your server. The default Redis URL is `redis://localhost:6379`.

## Usage

- Use the provided API endpoints to interact with the application.
- Refer to the API documentation for details on request and response formats.

