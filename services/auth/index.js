import jwt from 'jsonwebtoken'


const generateToken=(id)=>{
     return jwt.sign(
        {
            id
        },
        process.env.ACCESS_TOKEN_SECRET
     )
}



export default generateToken