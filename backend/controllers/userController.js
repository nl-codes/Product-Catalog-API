// Import service-level functions for handling category data operations
import { generateToken } from "../utils/generateToken.js";
import { addUsers, verifyUser } from "../services/userService.js";

/**
 * @function registerUser
 * @description Controller for handling user registration (admin or user).
 *              Calls the `addUsers` service to create a new user, generates a JWT token,
 *              and responds with a success message and token if registration succeeds.
 *
 * @throws {Error} Returns appropriate HTTP status codes:
 * - 404 if username or password is missing
 * - 400 for other input or server-side errors
 *
 * @returns {Object} JSON response with a success message and JWT token.
 *
 * @example Request
 * {
 *   "username": "john_doe",
 *   "password": "securePass123",
 *   "role": "user" | "admin"
 * }
 *
 * @example Response
 * {
 *   "message": "Registration Successfull",
 *   "token": "<JWT_TOKEN>"
 * }
 *
 */
export const registerUser = async (req, res) => {
    try {
        const registeredUser = await addUsers(req.body);
        const token = generateToken(registeredUser.toJSON());
        res.status(200).json({
            message: "Registration Successfull",
            token: token,
        });
    } catch (err) {
        let status = 400;
        if (err.message === "Username and Password required.") {
            status = 404;
        }
        console.error("❌ Error registering user: ", err);
        res.status(status).json({ error: err.message });
    }
};

/**
 * @function loginUser
 * @description Authenticates a user (admin or user) using credentials provided in the request body.
 *              Calls `verifyUser` service to validate username, password, and role.
 *              If authentication is successful, returns a JWT token.
 *
 * @throws {Error} Returns HTTP 400 with error message for invalid credentials or other failures.
 *
 * @returns {Object} JSON response containing a success message and JWT token.
 *
 * @example Request
 * {
 *   "username": "admin123",
 *   "password": "securePass!",
 *   "role": "admin"
 * }
 *
 * @example Response
 * {
 *   "message": "Login Successful",
 *   "token": "<JWT_TOKEN>"
 * }
 *
 * @note The route should use middleware like `attachRole("admin")` or `attachRole("user")`
 *       to ensure the correct `role` is included in `req.body` before this controller runs.
 */
export const loginUser = async (req, res) => {
    try {
        const loginUser = await verifyUser(req.body);
        const token = generateToken(loginUser.toJSON());
        res.status(200).json({ messge: "Login Successful", token: token });
    } catch (err) {
        let status = 400;
        console.error("❌ Error registering user: ", err);
        res.status(status).json({ error: err.message });
    }
};
