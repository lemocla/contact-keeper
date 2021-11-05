//Entry point to backend - create very basic Express server
const express = require('express');
const connectDB = require('./config/db');

// Initialise express in constant app with a listen method
const app = express();

// Connect MongoDB
connectDB(); 

//Add end point
app.get('/', (req, res) => res.json({msg: 'Hello World'}));
//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Port
const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))