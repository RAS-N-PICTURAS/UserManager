require('dotenv').config();
const userService = require('./users_service/services/userService');


(async () => {
  try {
    // --- User SERVICE TESTS ---
    console.log('\n--- USER SERVICE TESTS ---');

    // Create a user
    const newUser = await userService.createUser({
      name: 'Inês Silva',
      email: 'inessilva@gmail.com',
      password_hash: '$2a$12$PCoNtk6Th3QxFVAI9Ze7ButF7kdfBuNrk6Q0Qpc1yIBQyJqkiP.im',
      type: 'Authenticated'
    });
    console.log('Created User:', newUser);

    // Get the user
    const fetchedUser = await userService.getUserById(newUser.id);
    console.log('Fetched User:', fetchedUser);

    // Update the user
    const updatedUser = await userService.updateProfile(newUser.id, { email: 'ines@gmail.com' });
    console.log('Updated User:', updatedUser);


    await userService.deleteUser(newUser.id);
    console.log('Deleted User:', newUser.id);

  } catch (error) {
    console.error(error);
  }
})();