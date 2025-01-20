require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log(process.env.DB_USER);
        console.log(process.env.DB_NAME);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_HOST);
      

        console.log("Database connection successful. Current time:", result.rows[0]);
    } catch (error) {
        console.error("Database connection failed:", error.message);
    } finally {
        pool.end();
    }
})();
