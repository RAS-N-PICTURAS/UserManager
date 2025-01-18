const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); // Importar os controladores
/*const authMiddleware = require('../middleware/auth'); // Middleware de autenticação hipotético*/

/**
 * @route GET /register
 * @description Obtém o formulário de registo
 * @access Público
 */
router.get('/register', (req, res) => {
    res.status(200).json({ message: 'Register form' });
});

/**
 * @route POST /register
 * @description Regista um novo utilizador
 * @access Público
 */
router.post('/register', userController.register);

/**
 * @route GET /login
 * @description Obtém o formulário de login
 * @access Público
 */
router.get('/login', (req, res) => {
    res.status(200).json({ message: 'Login form' });
});

/**
 * @route POST /login
 * @description Realiza o login de um utilizador
 * @access Público
 */
router.post('/login', userController.login);

/**
 * @route GET /profile
 * @description Obtém o perfil do utilizador autenticado
 * @access Privado (requer autenticação)
 */
router.get('/profile', userController.profile);

/**
 * @route GET /profile/edit
 * @description Obtém o formulário para editar o perfil do utilizador autenticado
 * @access Privado (requer autenticação)
 */
router.get('/profile/edit', (req, res) => {
    res.status(200).json({ message: 'Edit profile form' });
});

/**
 * @route PUT /profile
 * @description Atualiza o perfil do utilizador autenticado
 * @access Privado (requer autenticação)
 */
router.put('/profile', userController.editProfile);

module.exports = router;
