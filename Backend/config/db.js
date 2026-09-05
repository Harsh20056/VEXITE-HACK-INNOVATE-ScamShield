const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scamshield');
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    // Don't exit process so app can run even if DB isn't running locally yet
  }
};

module.exports = connectDB;
