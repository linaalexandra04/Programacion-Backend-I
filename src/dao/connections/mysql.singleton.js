import mysql from 'mysql2/promise';
import config from '../../config.js';

class MySQLSingleton {
    constructor() {
        this.connection = null;
    }

    async connect() {
        if (!this.connection) {
            try {
                this.connection = await mysql.createConnection({
                    host: config.MYSQL_HOST || 'localhost',
                    user: config.MYSQL_USER || 'root',
                    password: config.MYSQL_PASSWORD || '',
                    database: config.MYSQL_DATABASE || 'tiendaCafe',
                });
                console.log('Conexión exitosa a MySQL');
            } catch (error) {
                console.error('Error conectando a MySQL:', error.message);
                throw error;
            }
        }
        return this.connection;
    }
}

export default new MySQLSingleton();