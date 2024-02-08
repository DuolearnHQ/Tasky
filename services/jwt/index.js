import jwt from 'jsonwebtoken';

/**
 * Creates a JSON Web Token (JWT) for a given user.
 * 
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<object>} A promise that resolves to the generated JWT token.
 */

export const createToken = async (id) => {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET);
}

/**
 * Verifies a JSON Web Token (JWT) and returns the decoded token.
 * 
 * @param {string} token 
 * @returns {Promise<object>} A promise that resolves to the decoded JWT token.
 */

export const verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}