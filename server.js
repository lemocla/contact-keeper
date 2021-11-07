//Entry point to backend - create very basic Express server
const express = require('express');
const connectDB = require('./config/db');
// Node js path module --> deal with file path
const path = require('path');

// Initialise express in constant app with a listen method
const app = express();

// Connect MongoDB
connectDB(); 

//Init Middleware
app.use(express.json({ extended: false })) // accept json data

//Add end point
//app.get('/', (req, res) => 
//    res.json({ msg: 'Wecome to the Contact Keeper API' })
//);

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Serve static assets in production (serve react in production)
if (process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'))
    // look into client folder > build folder > index.html
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

//Port
const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))