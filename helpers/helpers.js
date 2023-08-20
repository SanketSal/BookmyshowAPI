// Import necessary modules and dependencies
const redis = require('redis');
const { promisify } = require('util');

// Create a Redis client
const client = redis.createClient();

// Promisify Redis functions for async/await
const hgetAsync = promisify(client.hget).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);

// Helper function to update Redis cache
async function updateRedisCache(key, data) {
  try {
    // Convert data to JSON if necessary
    const jsonData = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Set data in Redis with a key
    await hmsetAsync(key, { data: jsonData });
    
    // Expire the cache after a specific time (e.g., 1 hour)
    client.expire(key, 3600);
  } catch (error) {
    console.error('Error updating Redis cache:', error);
  }
}

// Helper function to get data from Redis cache
async function getDataFromCache(key) {
  try {
    const cachedData = await hgetAsync(key, 'data');
    
    // Parse JSON data if found in cache
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    return null; // Return null if data not found in cache
  } catch (error) {
    console.error('Error getting data from Redis cache:', error);
    return null;
  }
}

module.exports = { updateRedisCache, getDataFromCache };
