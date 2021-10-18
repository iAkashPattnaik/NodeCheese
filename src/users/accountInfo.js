const { Pool } = require('pg');

async function accountInfo(login) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl,
    });
    try {
        var result = await pool.query('SELECT * FROM TestUsers WHERE login = $1', [login]);
        pool.end();
        return result;
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

module.exports = accountInfo;