const bcrypt = require('bcryptjs'); // Para hash e comparação de senha
const pool = require('../config/db');
class User {
  static async create(data) {
 
    const { name, email, password_hash, type } = data;
    console.log(data);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, type) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password_hash, type]
    );
    return result.rows[0];
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async update(id, data) {
    const { email } = data;
    const result = await pool.query(
      'UPDATE users SET email = $1 WHERE id = $2 RETURNING *',
      [email, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  // Método para verificar a senha
  static async checkPassword(user, password) {
    return bcrypt.compare(password, user.password_hash); // Verifica a senha
  }
}

module.exports = User;