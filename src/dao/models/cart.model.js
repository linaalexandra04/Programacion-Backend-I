import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
            quantity: { type: Number, required: true } 
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
});

export default mongoose.model('Cart', cartSchema);
