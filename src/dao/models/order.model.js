import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
