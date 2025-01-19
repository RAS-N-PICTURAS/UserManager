// user.js - Controladores para operações dos utilizadores
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

// Registrar um novo utilizador
module.exports.register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user); // Return the created project
      } catch (error) {
        res.status(400).json({ error: error.message }); // Handle validation errors
      }
   
   
   
   
    /* try {
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
    }*/
};

// Login
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Procurar utilizador pelo email
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verificar a palavra-passe
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user.id, type: user.type }, 'secrect_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login with success', token });
    } catch (error) {
        res.status(500).json({ error: 'Error while login in', details: error.message });
    }
};

// Perfil do utilizador
module.exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json(user); // Return the project
      } catch (error) {
        res.status(404).json({ error: error.message }); // Handle not found errors
      }
};

// Editar perfil do utilizador
module.exports.editProfile = async (req, res) => {

    try {
        const user = await userService.updateProfile(req.params.id, req.body);
        res.status(200).json(user); // Return the updated user
      } catch (error) {
        res.status(400).json({ error: error.message }); // Handle validation or not found errors
      }

    
};

module.exports.deleteProfile = async (req, res) => {
    try {
      const user = await userService.deleteProfile(req.params.id);
      res.status(200).json(user); // Return the deleted project
    } catch (error) {
      res.status(404).json({ error: error.message }); // Handle not found errors
    }
  };
  

