/**
 * Server Entry Point
 *
 * This module initializes the HTTP server using the configured Express
 * application instance. It is responsible only for starting the server
 * and handling environment-based configuration (host, port, etc.).
 *
 * Responsibilities of this file:
 *  - Read HOST and PORT from environment variables
 *  - Start the Express server
 *  - Output a clear startup message for developers or logs
 *
 * server.js does NOT:
 *  - Register routes
 *  - Process middleware
 *  - Contain business logic
 *
 * All application logic lives in app.js and the internal layers
 * (Routes → Controllers → Services → Repositories).
 */

const app = require("./app");

// Load configuration from environment (with sensible defaults)
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

/**
 * Starts the HTTP server.
 *
 * Once running, the server listens for incoming requests and delegates
 * them to the Express application pipeline.
 */
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
