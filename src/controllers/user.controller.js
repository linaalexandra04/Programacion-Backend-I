import UserDTO from '../dao/dto/users.dto.js';
import UsersService from '../dao/services/user.service.mongo.js'; 

const usersService = new UsersService();

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        const formattedUsers = users.map(user => new UserDTO(user).toResponse());
        res.status(200).json({ users: formattedUsers });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los usuarios', details: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersService.getUserById(id);
        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        const formattedUser = new UserDTO(user).toResponse();
        res.status(200).json(formattedUser);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el usuario', details: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await usersService.createUser(req.body);
        const formattedUser = new UserDTO(newUser).toResponse();
        res.status(201).json(formattedUser);
    } catch (error) {
        res.status(500).send({ error: 'Error al crear el usuario', details: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await usersService.updateUser(id, req.body);
        if (!updatedUser) {
            return res.status(404).send({ error: 'Usuario no encontrado para actualizar' });
        }
        const formattedUser = new UserDTO(updatedUser).toResponse();
        res.status(200).json(formattedUser);
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar el usuario', details: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await usersService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).send({ error: 'Usuario no encontrado para eliminar' });
        }
        res.status(200).send({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar el usuario', details: error.message });
    }
};