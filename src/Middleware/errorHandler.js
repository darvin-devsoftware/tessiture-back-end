/**
 * Global Error Handling Middleware
 *
 * This middleware acts as the final error interceptor in the Express pipeline.
 * Any error thrown inside controllers, services, repositories, or other
 * middleware handlers will be forwarded here via next(error).
 *
 * Responsibilities:
 *  - Handle custom application errors (with statusCode)
 *  - Log unexpected and unhandled runtime errors
 *  - Respond with safe and consistent error messages
 *
 * IMPORTANT:
 *  Do NOT send internal error details to the client in production.
 */

/**
 * @param {Error} err - Error object thrown in the app
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {Function} next - Express next function (unused here)
 */
const errorHandler = (err, req, res, next) => {
    // Log internal server errors to console or external log service
    console.error(err);

    /**
     * Custom application error:
     * Example:
     *   throw { statusCode: 400, message: "Invalid input" }
     */
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    /**
     * Unhandled / Unknown / Runtime Error:
     * These errors should NOT expose details to the client for security reasons.
     */
    res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
};

module.exports = errorHandler;
