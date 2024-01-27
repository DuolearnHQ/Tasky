import jwt from 'jsonwebtoken'

/**
 * 
 * @param {string} - user id 
 * @returns {<token>} - jwt token
 */
const generateToken=(id)=>{
     return jwt.sign(
        {
            id
        },
        process.env.ACCESS_TOKEN_SECRET
     )
}



export default generateToken