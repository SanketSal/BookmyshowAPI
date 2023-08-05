const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

// Promisify Redis functions
const hgetAsync = promisify(client.hget).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);

// Helper function to update Redis cache for a showtime and seats
async function updateRedisCache(showtime_id, seats) {
  const redisKey = `showtime:${showtime_id}`;
  const data = {
    is_booked: 'true',
  };
  seats.forEach((seatNumber) => {
    data[`seat:${seatNumber}`] = 'true';
  });
  await hmsetAsync(redisKey, data);
}

// Helper function to get data from Redis cache
async function getDataFromCache(redisKey) {
  const data = await hgetAsync(redisKey, ...Object.keys(redisKey));
  return data ? JSON.parse(data) : null;
}

module.exports = { updateRedisCache, getDataFromCache };
