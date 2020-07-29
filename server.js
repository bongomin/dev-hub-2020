const express = require('express');
const mongoose = require('mongoose');


const usersRoute = require('./routes/api/Users');
const profileRoute = require('./routes/api/Profile');
const postsRoute = require('./routes/api/Posts');


const app = express();


// datanbase configurations
const dataBase = require('./config/keys').mongoURI;

// connecting to the mongodb
mongoose.connect(dataBase, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(success => {
      console.log('Database Connection Successful.....')
   })
   .catch(error => {
      console.log(error)
   })

// Used Routes
app.use('/api/users', usersRoute);
app.use('/api/profile', usersRoute);
app.use('/api/posts', usersRoute);




// setting up the server Port
const PORT = process.env.PORT || 5000;
// listing to the app port
app.listen(PORT, () => {
   console.log(`devHub Server running on Port:... ${PORT}`)
})