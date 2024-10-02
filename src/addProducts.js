import mongoose from 'mongoose';
import Product from './models/Products.js';

const mongoUri = 'mongodb+srv://alexa999:29oO4cbPUrXPIdUg@cluster1.mh8bk.mongodb.net/tiendaCafe?retryWrites=true&w=majority&appName=Cluster1';

const initialProducts = [
    {
        title: 'Café Fino',
        description: 'Café de grano fino con un sabor exquisito.',
        price: 10,
        category: 'fino',
        stock: 50,
        imageUrl: 'public/img/2.png'
    },
    {
        title: 'Café Medio',
        description: 'Café de grano medio con un toque equilibrado.',
        price: 8,
        category: 'medio',
        stock: 30,
        imageUrl: 'public/img/3.png'
    },
    {
        title: 'Café Grueso',
        description: 'Café de grano grueso con un sabor fuerte.',
        price: 6,
        category: 'grueso',
        stock: 20,
        imageUrl: 'public/img/4.png'
    }
];

const addProducts = async () => {
    try {
        await mongoose.connect(mongoUri);  
        console.log('Conexión a MongoDB exitosa');

        await Product.insertMany(initialProducts);
        console.log('Productos agregados correctamente a la base de datos');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error al agregar productos:', error);
        mongoose.connection.close();
    }
};

addProducts();
