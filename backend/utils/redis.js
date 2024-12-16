import redis from "redis";
import { promisify } from "util";

const redisClient = redis.createClient({
    // Konfigurationsoptionen, wie z.B. host, port, etc.
});

redisClient.on("error", (err) => {
    console.error(`Redis Error: ${err}`)
});

await redisClient.connect();

export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);

export default redisClient;