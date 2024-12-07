const express = require('express');
const sql = require('mssql');
const app = express();

// Use the connection string from the environment variable
const sqlConfig = process.env.SQL_CONNECTION_STRING;

// Declare the dbConnectionStatus in the appropriate scope
let dbConnectionStatus = 'Database connection has not been established yet.';

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        await sql.connect(sqlConfig);
        dbConnectionStatus = 'Database connection successful!';
        console.log(dbConnectionStatus);
    } catch (err) {
        dbConnectionStatus = 'Database connection failed: ' + err.message;
        console.error(dbConnectionStatus);
    }
};

// Connect to the database when the application starts
connectToDatabase();

app.get('/', (req, res) => {
    const currentDateTime = new Date().toISOString();
    res.json({
        message: 'Hello World from Azure App Service2',
        dbConnectionStatus: dbConnectionStatus,
        currentDateTime: currentDateTime
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
