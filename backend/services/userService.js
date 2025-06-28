import { User } from "../models/models.js";
import bcrypt from "bcrypt";

/**
 * @function addUsers
 * @description Creates and saves a new user (admin or regular user) in the database.
 *              Validates input fields, checks for existing user-role pair, hashes the password,
 *              and securely stores the user.
 *
 * @param {Object} param - Object containing user registration details.
 * @param {string} param.username - The username of the user (required).
 * @param {string} param.password - The plain-text password of the user (required).
 * @param {string} param.role - The role of the user, must be either "admin" or "user" (required).
 *
 * @throws {Error} If any required field is missing.
 * @throws {Error} If the role is invalid (not "admin" or "user").
 * @throws {Error} If a user with the same username and role already exists.
 *
 * @returns {Promise<Object>} The newly created user document (with password hashed).
 *
 */
export const addUsers = async ({ username, password, role }) => {
    if (!username || !password || !role) {
        throw new Error("Username, Password and Role are required.");
    }

    if (!["admin", "user"].includes(role)) {
        throw new Error("Invalid role. Please choose admin | user");
    }
    const existingUser = await User.findOne({ username: username, role: role });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const randomSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    const newUser = new User({
        username: username,
        password: hashedPassword,
        role: role,
    });

    return await newUser.save();
};

export const verifyUser = async ({ username, password, role }) => {
    if (!username || !password || !role) {
        throw new Error("Username, Password and role required.");
    }
    const existingUser = await User.findOne({ username: username, role: role });

    if (!existingUser) {
        throw new Error("Invalid username or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid username or password");
    }
    return existingUser;
};
