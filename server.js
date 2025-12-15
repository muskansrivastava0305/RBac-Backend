const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authroute');
const projectRoutes = require('./routes/projectsroute');
app.use("/api/users", require("./routes/userRoutes"));



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

app.listen(process.env.PORT, ()=>console.log(`Server running on port ${process.env.PORT}`));
