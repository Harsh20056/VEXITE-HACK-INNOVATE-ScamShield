require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const verifyRoutes = require('./routes/verifyRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Database Connection
connectDB();

// API Routes
app.use('/api/verify', verifyRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ScamShield Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ScamShield server running on port ${PORT}`));

