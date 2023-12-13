import { userModel } from '../../db/models/user.js';
import { winstonLogger } from '../../middlewares/logger.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const findUserByEmail = async (email) => { }

/**
 * Creates a new user.
 * @param {string} email 
 * @param {string} fullname 
 * @param {string} password 
 * @returns {Promise<userModel>} A promise that resolves to the created user.
 * @throws {Error} if there is an error creating the user.
 */
export const createUser = async (email, fullname, password) => {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const existingUser = await userModel.findOne({ email });

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        if (fullname.length < 3) {
            throw new Error('Fullname must be at least 3 characters long');
        }

        if (!email.includes('@') || !email.includes('.com')) {
            throw new Error('Invalid email');
        }

        if (existingUser) {
            throw new Error('User already exists');
        }

        const user = new userModel({ email, fullname, password: hash });
        await user.save();

        const token = await jwt.sign({ userId: user.id }, process.env.SECRET);
        return token;
    } catch (error) {
        winstonLogger.error('Error creating user:', error);
        throw new Error(error);
    }
}

export const findUserById = async (id) => { }

export const updateUserById = async (id, propertiesToBeUpdated) => { }

// more, if required