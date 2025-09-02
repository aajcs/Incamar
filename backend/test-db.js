import pkg from 'pg';
import 'dotenv/config';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'TU_DATABASE_URL_AQUI',
});
console.log('client', process.env.DATABASE_URL);
client
  .connect()
  .then(() => {
    console.log('¡Conexión exitosa a PostgreSQL!');
    return client.end();
  })
  .catch((err) => {
    console.error('Error de conexión:', err);
  });
