import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

class UserDAO {
    async createUser(userData) {
        try {
            userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(10));
            return await User.create(userData);
        } catch (err) {
            throw new Error(`Error creando usuario: ${err.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({ email }).lean();
        } catch (err) {
            throw new Error(`Error obteniendo usuario por email: ${err.message}`);
        }
    }

    async getUserById(userId) {
        try {
            return await User.findById(userId).lean();
        } catch (err) {
            throw new Error(`Error obteniendo usuario por ID: ${err.message}`);
        }
    }
}

export default UserDAO;
