import mysql from 'mysql2/promise';
import 'dotenv/config';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua senha',
  database: 'webcroche',
});

console.log('--> Conexão com BD estabelecida 😎 <--');

export { connection }
