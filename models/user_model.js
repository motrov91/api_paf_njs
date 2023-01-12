import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

import db from '../config/db.js'

const User = db.define('Users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    token:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    hooks: {
        //* when you have to create a new register, you take req.body in this case funciont(user)
        beforeCreate: async function(user){
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash( user.password, salt )
        }
    },
    scopes:{
        deletePassword:{
            attributes:{
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        }
    }
});

//Customs methods
User.prototype.verifyPassword = function( password ){
    return bcrypt.compareSync(password, this.password)
}



export default User;