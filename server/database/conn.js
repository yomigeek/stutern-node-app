import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

const mydatabase = process.env.DATABASE_URL;

console.log(mydatabase, "mydb");


const connect = new Pool({
  connectionString: mydatabase,
  ssl: { rejectUnauthorized: false }
});

connect.on('error', (err, client) => {
    console.error('Error:', err);
});

export default connect;
