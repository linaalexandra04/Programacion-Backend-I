import User from './models/user.model.js';
import bcrypt from 'bcrypt';

class UserManager {
    constructor() {}

    // Get all users
    async get() {
        try {
            return await User.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    // Get a single user by filter
    async getOne(filter) {
        try {
            return await User.findOne(filter).lean();
        } catch (err) {
            return err.message;
        }
    }

    // Add a new user
    async add(data) {
        try {
            // Hash the password before saving
            data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
            return await User.create(data);
        } catch (err) {
            return err.message;
        }
    }

    // Update user information
    async update(filter, update, options = { new: true }) {
        try {
            return await User.findOneAndUpdate(filter, update, options).lean();
        } catch (err) {
            return err.message;
        }
    }

    // Delete a user by filter
    async delete(filter) {
        try {
            return await User.findOneAndDelete(filter).lean();
        } catch (err) {
            return err.message;
        }
    }

    // Authenticate a user
    async authenticate(email, password) {
        try {
            const foundUser = await User.findOne({ email }).lean();
            if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
                const { password, ...filteredUser } = foundUser;
                return filteredUser;
            } else {
                return null;
            }
        } catch (err) {
            return err.message;
        }
    }
}

export default UserManager;
