import jwt from 'jsonwebtoken';

const generateJWT = data => jwt.sign({
        id : data.id,
        name: data.name,
        email: data.email,
        cargo: data.cargo
    }, process.env.JWT_SECRET,{
        expiresIn: '7d'
})

export {
    generateJWT
}

