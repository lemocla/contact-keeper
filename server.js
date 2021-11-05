//Entry point to backend - create very basic Express server
const express = require('express');
const connectDB = require('./config/db');

// Initialise express in constant app with a listen method
const app = express();

// Connect MongoDB
connectDB(); 

//Init Middleware
app.use(express.json({ extended: false })) // accept json data

//Add end point
app.get('/', (req, res) => 
    res.json({ msg: 'Wecome to the Contact Keeper API' })
);

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Port
const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))