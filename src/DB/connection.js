/**
 * MySQL Connection Pool Configuration
 *
 * This module initializes and exports a reusable MySQL connection pool
 * using mysql2/promise. It provides efficient database access by
 * maintaining a pool of active connections rather than opening a new
 * connection for each query.
 *
 * Environment Variables Required:
 *  - DB_HOST: Database host address
 *  - DB_USER: Username
 *  - DB_PASSWORD: User password
 *  - DB_NAME: Database name
 */

const mysql = require('mysql2/promise');

/**
 * Create a MySQL connection pool.
 *
 * The pool handles:
 *  - Automatic connection reuse
 *  - Queueing of queries when the pool is busy
 *  - Load balancing across open connections
 *
 * @type {import('mysql2/promise').Pool}
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Ensures queued requests wait for an available connection
    waitForConnections: true,

    // Maximum number of open connections
    connectionLimit: 10,

    // Maximum number of requests allowed in the queue (0 = unlimited)
    queueLimit: 0
});

module.exports = { pool };
