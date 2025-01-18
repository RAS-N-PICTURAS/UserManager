// user.js - Controladores para operações dos utilizadores
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Importar o modelo do utilizador

// Registrar um novo utilizador
module.exports.register = async (req, res) => {
    try {
        const { _id, name, email, password, type } = req.body;

        // Verificar se o utilizador já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash da palavra-passe
        const password_hash = await bcrypt.hash(password, 10);

        // Criar um novo utilizador
        const newUser = new User({ _id, name, email, password_hash, type });
        await newUser.save();

        res.status(201).json({ message: 'User registered with success!' });
    } catch (error) {
        res.status(500).json({ error: 'Error while creating new user', details: error.message });
    }
};

// Login
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Procurar utilizador pelo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verificar a palavra-passe
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user._id, type: user.type }, 'secrect_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login with success', token });
    } catch (error) {
        res.status(500).json({ error: 'Error while login in', details: error.message });
    }
};

// Perfil do utilizador
exports.profile = async (req, res) => {
    try {
        const userId = req.user.id; // user.id vem do middleware de autenticação

        const user = await User.findById(userId, '-password_hash'); // Excluir a palavra-passe do retorno
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error finding the profile', details: error.message });
    }
};

// Editar perfil do utilizador
exports.editProfile = async (req, res) => {
    try {
        const userId = req.user.id; // user.id vem do middleware de autenticação
        const { name, email, password } = req.body;

        // Atualizar os dados
        const updatedData = { name, email };
        if (password) {
            updatedData.password_hash = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Profile info updated with success', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error while updating the profile', details: error.message });
    }
};
