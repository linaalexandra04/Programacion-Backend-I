import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, default: 'user' }
});

// Encriptar contraseña antes de guardar
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
});

export default mongoose.model('User', userSchema);
