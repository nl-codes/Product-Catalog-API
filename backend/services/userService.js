import { User } from "../models/models.js";
import bcrypt from "bcrypt";

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
