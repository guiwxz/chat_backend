import Pool from 'pg';
import 'dotenv/config';

const { Client } = Pool;

const client = new Client(process.env.DATABASE_URL);

client.connect();

export default client;