import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'; 

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, 
        index: true  
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'El precio debe ser mayor o igual a 0'],  
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true  
    },
    availability: {
        type: Boolean,
        default: true,
        validate: {
            validator: function(v) {
                return this.stock > 0 || !v;
            },
            message: 'El producto no puede estar disponible si no hay stock',
        }
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock debe ser mayor o igual a 0'],  
    },
    imageUrl: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);  
            },
            message: 'Debe ser una URL válida',
        },
        required: false, 
    }
}, { timestamps: true });  

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;
