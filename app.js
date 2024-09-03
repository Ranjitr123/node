const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const staffRoutes = require('./routes/staffRoutes'); // Import routes

const app = express();
app.use(express.json());
app.use(cors());

const url = 'mongodb://localhost:27017/dev';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Use the staff routes
app.use('/api', staffRoutes);

const port = 3500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
