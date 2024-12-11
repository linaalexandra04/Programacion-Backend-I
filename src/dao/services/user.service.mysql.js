import mysqlConnection from '../connections/mysql.singleton.js';

class UsersServiceMySQL {
    async createUser(userData) {
        const query = 'INSERT INTO users (first_name, last_name, email, age, password, role) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [
            userData.first_name,
            userData.last_name,
            userData.email,
            userData.age,
            userData.password,
            userData.role || 'user'
        ];

        try {
            const [result] = await mysqlConnection.execute(query, values);
            return { id: result.insertId, ...userData };
        } catch (error) {
            throw new Error('Error creando usuario en MySQL: ' + error.message);
        }
    }

    async getUserById(userId) {
        const query = 'SELECT * FROM users WHERE id = ?';

        try {
            const [rows] = await mysqlConnection.execute(query, [userId]);
            return rows[0];
        } catch (error) {
            throw new Error('Error obteniendo usuario por ID en MySQL: ' + error.message);
        }
    }

    async updateUser(userId, updateData) {
        const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(updateData), userId];
        const query = `UPDATE users SET ${fields} WHERE id = ?`;

        try {
            await mysqlConnection.execute(query, values);
            return { id: userId, ...updateData };
        } catch (error) {
            throw new Error('Error actualizando usuario en MySQL: ' + error.message);
        }
    }

    async deleteUser(userId) {
        const query = 'DELETE FROM users WHERE id = ?';

        try {
            await mysqlConnection.execute(query, [userId]);
            return { message: 'Usuario eliminado', id: userId };
        } catch (error) {
            throw new Error('Error eliminando usuario en MySQL: ' + error.message);
        }
    }
}

export default UsersServiceMySQL;