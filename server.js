// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb+srv://uipathaceec:EP4fZNoWazytx9MT@aceattendance.bpz5z.mongodb.net/attendance_ace', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.log('Failed to connect to MongoDB', err);
//   });

//   const userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     name: String,  // 'name' field to store user names
//     department: String,  // 'department' field to store the department name
//   }, {
//     timestamps: true
//   });

// const User = mongoose.model('User', userSchema);

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log('login');
  
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     if (password !== user.password) {  // Simple password comparison, consider using bcrypt for production
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id, Username: user.name }, process.env.JWT_SECRET || 'your_jwt_secret', {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ 
//       msg: 'Authentication Successful', 
//       token, 
//       name: user.name, 
//       department: user.department // Return department in the response
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });


// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://192.168.1.104:${PORT}`);
// });

// if (password !== user.password) {  // Simple password comparison, consider using bcrypt for production
//   return res.status(400).json({ msg: 'Invalid credentials' });
// }

// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs'); // Consider using bcrypt for secure password comparison
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb+srv://uipathaceec:EP4fZNoWazytx9MT@aceattendance.bpz5z.mongodb.net/attendance_ace', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.log('Failed to connect to MongoDB', err);
//   });

// // User schema
// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   name: String,  // 'name' field to store user names
//   department: String,  // 'department' field to store the department name
// }, {
//   timestamps: true
// });

// const User = mongoose.model('User', userSchema);

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

    
//     if (password !== user.password) {  // Simple password comparison, consider using bcrypt for production
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET || 'your_jwt_secret', {
//       expiresIn: '1h',
//     });

//     // Respond with the token, name, and department
//     res.status(200).json({ 
//       msg: 'Authentication Successful', 
//       token, 
//       name: user.name, 
//       department: user.department 
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://192.168.1.103:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://uipathaceec:EP4fZNoWazytx9MT@aceattendance.bpz5z.mongodb.net/attendance_ace', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords using if
    if (password !== user.password) {  // Simple password comparison, consider using bcrypt for production
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    // Respond with the token, name, and department
    res.status(200).json({ 
      msg: 'Authentication Successful', 
      token, 
      name: user.name,
      department: user.department 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Students Details
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://192.168.72.121:${PORT}`);
});