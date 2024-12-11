import UsersServiceMongo from './user.service.mongo.js';
import UsersServiceMySQL from './user.service.mysql.js';
import config from '../../config.js';

class FactoryService {
    static getService() {
        switch (config.DB_TYPE) {
            case 'mongo':
                return new UsersServiceMongo();
            case 'mysql':
                return new UsersServiceMySQL();
            default:
                throw new Error('Tipo de base de datos no soportado');
        }
    }
}

export default FactoryService;