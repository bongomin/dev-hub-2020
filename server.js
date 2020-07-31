const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')


const usersRoute = require('./routes/api/Users.route');
const profileRoute = require('./routes/api/Profile.route');
const postsRoute = require('./routes/api/Posts.route');


const app = express();

// body bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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


// passport middleWare here
app.use(passport.initialize());

// passport Config
require('./config/passport')(passport);

// Used Routes
app.use('/api/users', usersRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);





// setting up the server Port
const PORT = process.env.PORT || 5000;
// listing to the app port
app.listen(PORT, () => {
   console.log(`devHub Server running on Port:... ${PORT}`)
})