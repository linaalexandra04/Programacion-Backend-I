import mongoose from 'mongoose';

mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
    role: { type: String, default: 'user' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;