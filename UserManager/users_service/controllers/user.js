// user.js - Controladores para operações dos utilizadores
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

// Registrar um novo utilizador
module.exports.register = async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password, type } = req.body;

      // Verificar se o utilizador já existe
      console.log("ola!");
      /*onst existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
          return res.status(400).json({ error: 'Email is already in use' });
      }*/
      console.log("ola depois da get useremail!");

      console.log(password);
      // Gerar hash da palavra-passe
      const password_hash = await bcrypt.hash(password, 10);
      console.log(password_hash);
      // Criar novo utilizador
      const user = await userService.createUser({ name, email, password_hash, type });
      res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
      res.status(500).json({ error: 'Error while registering user', details: error.message });
  }
};

// Login de utilizador
module.exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Obter utilizador pelo email
      const user = await userService.getUserByEmail(email);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Validar a palavra-passe
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
      }

      // Gerar token JWT
      const token = jwt.sign(
          { id: user.id, type: user.type },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRATION }
      );

      res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
      res.status(500).json({ error: 'Error while logging in', details: error.message });
  }
};

// Perfil do utilizador
module.exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user); // Return the project
      } catch (error) {
        res.status(404).json({ error: error.message }); // Handle not found errors
      }
};

// Editar perfil do utilizador
module.exports.editProfile = async (req, res) => {
    try {
        const user = await userService.updateProfile(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Error while updating profile', details: error.message });
  }

    
};

module.exports.deleteProfile = async (req, res) => {
      try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting user', details: error.message });
    }
  };
  

