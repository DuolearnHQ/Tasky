import jwt from 'jsonwebtoken';

/**
 * Creates a JSON Web Token (JWT) for a given user.
 * 
 * @param {string} id - The unique identifier of the user.
 * @param {string} secret - The secret key used to sign the token.
 * @returns {Promise<object>} A promise that resolves to the generated JWT token.
 */

export const createToken = async (id, secret) => {
    return jwt.sign({ userId: id }, secret);
}

/**
 * Verifies a JSON Web Token (JWT) and returns the decoded token.
 * 
 * @param {string} token 
 * @param {string} secret 
 * @returns {Promise<object>} A promise that resolves to the decoded JWT token.
 */

export const verifyToken = async (token, secret) => {
    return jwt.verify(token, secret);
}