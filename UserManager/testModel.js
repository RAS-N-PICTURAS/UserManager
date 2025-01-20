
require('dotenv').config(); // Load environment variables
const User = require('./users_service/models/user'); // Import User model


(async () => {
  try {
    // --- PROJECT MODEL TESTS ---
    console.log('\n--- USER MODEL TESTS ---');

    // Create a new project
    const newUser = await User.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password_hash: '$2a$10$XubIZ9zPDF2dUkLqFurs3OJ3RRzbGlNNRQ.v1ibuzxtqwSbNGUUcu',
      type : 'Authenticated'

    });
    console.log('Created User:', newUser);

    // Get the project by ID
    const fetchedProject = await User.getById(newUser.id);
    console.log('Fetched User:', fetchedProject);

    // Update the project
    const updatedUser = await User.update(newUser.id, { email: 'johndoe@gmail.com' });
    console.log('Updated Project:', updatedUser);

    // Delete the project
 /*   const deletedUser = await Project.delete(newUser.id);
    console.log('Deleted User:', deletedUser);*/


  } catch (error) {
    console.error(error);
  }
})();
