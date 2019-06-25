import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Utility = {

    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },


    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },


    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    },


    generateToken(id) {
        const token = jwt.sign({
            userId: id
        },
            process.env.SECRET, { expiresIn: '5d' }
        );
        return token;
    }

}

export default Utility;