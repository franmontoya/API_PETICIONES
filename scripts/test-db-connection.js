require('dotenv').config();
const sql = require('mssql');

async function test() {
  const cfg = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
    pool: { max: 2, min: 0, idleTimeoutMillis: 30000 },
    requestTimeout: 30000,
  };

  console.log('Probando conexión a SQL Server...', process.env.DB_HOST);
  try {
    const pool = await sql.connect(cfg);
    const result = await pool.request().query('SELECT 1 AS ok');
    console.log('Conexión OK:', result.recordset[0]);
    await pool.close();
    process.exit(0);
  } catch (err) {
    console.error('Error conectando a la BD:', err.message || err);
    process.exit(2);
  }
}

test();
