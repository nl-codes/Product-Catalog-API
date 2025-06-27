import { User } from "../models/models.js";
import bcrypt from "bcrypt";

export const addUsers = async ({ username, password }) => {
    if (!username || !password) {
        throw new Error("Username and Password required.");
    }
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const randomSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    const newUser = new User({ username: username, password: hashedPassword });

    return await newUser.save();
};

export const verifyUser = async ({ username, password }) => {
    if (!username || !password) {
        throw new Error("Username and Password required.");
    }
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }
    return existingUser;
};
