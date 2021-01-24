import { Pool } from 'pg';
import 'dotenv/config';

let pool;
if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.TESTDB_URL });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  });
}

export default pool;