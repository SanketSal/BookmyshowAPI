**Q1. It’s been 2 years since you built this API. The API overtime has become slow. Which columns would you index to improve the performance of the API ? Why ?**

To improve the performance of the API, we need to identify the columns that are frequently used in the WHERE clause of the queries and consider indexing them. Indexing these columns can significantly speed up the query execution time and improve overall API performance. Based on the API's functionality, here are the columns that we can consider indexing:

1. **Theatre ID (theatre_id)**:
   - This column is frequently used in the WHERE clause when fetching dates for a specific theatre or movies for a specific theatre and date.
   - Indexing this column will speed up the lookups for showtimes and dates related to a particular theatre.

2. **Showtime Date (show_date)**:
   - This column is used in the WHERE clause when fetching movies and showtimes for a specific theatre and date.
   - Indexing this column will speed up the search for showtimes on a particular date.

3. **Movie ID (movie_id)**:
   - This column is used in the WHERE clause when fetching showtimes for a specific movie.
   - Indexing this column will speed up the search for showtimes related to a particular movie.

4. **Showtime ID (showtime_id)**:
   - This column is used in the WHERE clause when booking seats for a specific showtime.
   - Indexing this column will speed up the search for the specific showtime when booking seats.

5. **Seat Number (seat_number)**:
   - This column is used in the WHERE clause when booking seats to check if the selected seats are available.
   - Indexing this column will speed up the search for available seats during the booking process.

It's important to note that adding indexes also comes with some trade-offs. While they improve read performance, they may slightly impact write performance, as indexes need to be updated whenever data is inserted, updated, or deleted. Therefore, it's crucial to strike a balance and index the columns that are critical for query performance while avoiding over-indexing, which can lead to increased storage and slower write operations.

To make an informed decision, it's best to analyze the API's query patterns and usage patterns over time, and consider using database monitoring tools to identify which queries are causing performance bottlenecks. This will help in making data-driven decisions on which columns to index for optimal API performance.

**Q2. You have noticed that even after indexing the columns the API speed isn’t under 100 ms. Update the code of existing API to cache the appropriate data in the redis. What all data would you cache and why ?**

To further improve the API speed and reduce response times, we can implement caching using Redis. Caching frequently requested data can significantly reduce the number of database queries and improve the overall API performance. Here's what data we can cache in Redis and why:

1. **Theatre Dates**:
   - We can cache the dates of the next 7 days for each theatre.
   - Why: Since the dates for the next 7 days are likely to remain the same for a given theatre within a short period, caching this data will reduce database queries for fetching the same data repeatedly.

2. **Movies and Showtimes for a Date and Theatre**:
   - We can cache the movies and their showtimes for a specific date and theatre.
   - Why: The movie schedules for a specific date and theatre are likely to remain relatively stable within a short period. Caching this data will avoid frequent database queries for the same request.

3. **Showtime Details**:
   - We can cache the details of a specific showtime, including available seats and their booking status.
   - Why: Booking seats for a showtime may happen multiple times, and caching this data can avoid repetitive database queries for the same showtime.

