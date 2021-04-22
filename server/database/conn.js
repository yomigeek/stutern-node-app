import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

const mydatabase = process.env.DATABASE_URL;

// Or 
// const pool = new Pool({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })
// check here https://node-postgres.com/features/connecting

const connect = new Pool({
  connectionString: mydatabase,
  ssl: { rejectUnauthorized: false }
});

connect.on('error', (err, client) => {
    console.error('Error:', err);
});

export default connect;