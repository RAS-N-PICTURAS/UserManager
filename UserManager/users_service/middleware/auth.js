const jwt = require('jsonwebtoken');

/**
 * Middleware para autenticar solicitações usando JWT.
 * @param {Object} req - Objeto de solicitação do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @param {Function} next - Função para chamar o próximo middleware.
 */
module.exports = (req, res, next) => {
    try {
        // Obter o token do cabeçalho Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Mandatory Authenticaction' });
        }

        const token = authHeader.split(' ')[1]; // Exemplo: "Bearer <token>"
        if (!token) {
            return res.status(401).json({ error: 'Token was not given' });
        }

        // Verificar o token
        const decoded = jwt.verify(token, 'secrect_key'); // Substitua "secrect_key" por uma variável de ambiente
        req.user = decoded; // Decodificar as informações do token (ex.: id, tipo)

        next(); // Prosseguir para o próximo middleware ou rota
    } catch (error) {
        res.status(403).json({ error: 'Token is invalid or expired' });
    }
};
