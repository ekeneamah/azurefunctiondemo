import * as sql from 'mssql';

const config: sql.config = {
  user: process.env.ClientId!, // Application (client) ID
  password: process.env.ClientSecret!, // Client Secret
  server: process.env.SqlServer!, // You can use an IP address or hostname
  database: process.env.Database!,
  options: {
    encrypt: true, // If using Azure, set this to true
    trustServerCertificate: true, // If using self-signed certificates, set this to true
  },
};

async function connect(): Promise<void> {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (error) {
    console.error('Error connecting to SQL Server:', error.message);
    throw error;
  }
}

async function close(): Promise<void> {
  try {
    await sql.close();
    console.log('Closed SQL Server connection');
  } catch (error) {
    console.error('Error closing SQL Server connection:', error.message);
    throw error;
  }
}

export { connect, close, sql };
