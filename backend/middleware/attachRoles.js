/**
 * @function attachRole
 * @description Middleware factory that assigns a specific role to the request body.
 *              Useful for setting user roles (e.g., "admin" or "user") based on the route,
 *              before handling registration or login logic.
 *
 * @param {string} role - The role to attach to the request body (e.g., "admin", "user").
 * @returns {Function} Express middleware that adds the role to `req.body`.
 *
 */
export const attachRole = (role) => (req, res, next) => {
    req.body.role = role;
    next();
};
