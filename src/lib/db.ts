import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

// Helper function to check database connection
export async function checkConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT 1 as connected');
    client.release();
    return result.rows[0].connected === 1;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Helper to get pool instance
export function getDb() {
  return pool;
}
