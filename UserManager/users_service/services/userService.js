const User =  require('../models/user');

const getUserById = async (id) => {
    const user = await User.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };

  const getUserByEmail = async (email) => {
    const user = await User.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };
  const updateProfile = async (id, data) => {
    const updatedUser = await User.update(id, data);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  };

  const deleteUser = async (id) => {
    const deletedUser = await User.delete(id);
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  };


  const createUser = async (data) => {
    return await User.create(data);
  };
  

  module.exports = {
    createUser,
    deleteUser,
    updateProfile,
    getUserById,
    getUserByEmail
  };