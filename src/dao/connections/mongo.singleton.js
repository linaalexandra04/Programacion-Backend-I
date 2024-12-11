import mongoose from 'mongoose';
import config from '../../config.js';

class MongoSingleton {
    constructor() {
        this.connection = null;
    }

    async connect() {
        if (!this.connection) {
            try {
                this.connection = await mongoose.connect(config.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.log('Conexión exitosa a MongoDB');
            } catch (error) {
                console.error('Error conectando a MongoDB:', error.message);
                throw error;
            }
        }
        return this.connection;
    }
}

export default new MongoSingleton();