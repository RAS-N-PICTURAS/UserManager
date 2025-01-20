const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); // Importar os controladores


/*router.get('/login', (req, res) => {
    res.status(200).json({ message: 'Login form' });
});

/**
 * @route POST /login
 * @description Realiza o login de um utilizador
 * @access Público

router.post('/login', userController.login);

 * @route GET /profile
 * @description Obtém o perfil do utilizador autenticado
 * @access Privado (requer autenticação)
*/

router.post('/register', userController.register); // Create a new user
router.post('/login', userController.login);
router.get('/:id', userController.getProfile); // Get user by ID
router.put('/:id', userController.editProfile); // Update profile
router.delete('/:id', userController.deleteProfile); // Delete profile


module.exports = router;
