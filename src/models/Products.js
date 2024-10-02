import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'; 

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0, 
    },
    imageUrl: {
        type: String,
        required: false, 
    }
}, { timestamps: true });

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;
