/**
 * @function verifyRole
 * @description Middleware factory to restrict access to users with a specific role.
 *              Checks the `req.user.role` (populated by a prior token verification step)
 *              and compares it with the expected role.
 *
 * @param {string} role - The required role for accessing the route (e.g., "admin" or "user").
 *
 * @returns {Object|void} Responds with a 403 status
 *                        if role doesn't matches
 *                        else proceeds to the next middleware..
 *
 * @note This middleware assumes that `req.user` has already been populated by a JWT verification middleware.
 */
export const verifyRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: "Only Admin have access" });
    }
    next();
};
