// config/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

/**
 * Function to connect to MongoDB
 * Uses Mongoose to connect to the database using the URI from .env
 */
const connectDB = async () => {
    try {
        // MongoDB connection string from the .env file
        const dbURI = process.env.MONGO_URI;

        // Connect to MongoDB using Mongoose
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // Required for using indexes on collections
            useFindAndModify: false, // Disable deprecated method for findAndModify
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;
