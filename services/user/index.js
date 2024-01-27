import { userModel } from "../../db/models/user.js";
import bcrypt from 'bcrypt';
/**
 *
 * @param {string} email - to unique identifier of the user
 * @returns {Promise<userModel>} - to resolve to the find user
 *  
 */

export const findUserByEmail = async (email) => {
 
    const user = await userModel.findOne({
      email,
    });
    return user;
  
};

 

 

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

        if (existingUser) {
            throw new Error('User already exists');
        }

        const user = new userModel({ email, fullname, password: hash });
        await user.save();

        return user.id;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

export const findUserById = async (id) => { }

export const updateUserById = async (id, propertiesToBeUpdated) => { }

export const findUserById = async (id) => {};

export const updateUserById = async (id, propertiesToBeUpdated) => {};

// more, if required
