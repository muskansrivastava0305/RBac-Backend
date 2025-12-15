const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ sabse pehle app banao

// middlewares
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require('./routes/authroute');
const projectRoutes = require('./routes/projectsroute');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

// db connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);














// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/authroute');
// const projectRoutes = require('./routes/projectsroute');
// app.use("/api/users", require("./routes/userRoutes"));


// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected successfully'))
//   .catch(err => console.log('❌ MongoDB connection error:', err));

// app.listen(process.env.PORT, ()=>console.log(`Server running on port ${process.env.PORT}`));
