import UserModel from '../models/user.model.js';

class UsersServiceMongo {
    async createUser(userData) {
        try {
            const user = new UserModel(userData);
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Error creando usuario en MongoDB: ' + error.message);
        }
    }

    async getUserById(userId) {
        try {
            return await UserModel.findById(userId);
        } catch (error) {
            throw new Error('Error obteniendo usuario por ID en MongoDB: ' + error.message);
        }
    }

    async updateUser(userId, updateData) {
        try {
            return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        } catch (error) {
            throw new Error('Error actualizando usuario en MongoDB: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            return await UserModel.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error('Error eliminando usuario en MongoDB: ' + error.message);
        }
    }
}

export default UsersServiceMongo;