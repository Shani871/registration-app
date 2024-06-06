const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.json({ message: 'Registration successful!' });
    } catch (error) {
        res.json({ message: 'Registration failed!' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
