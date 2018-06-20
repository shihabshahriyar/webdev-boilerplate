//INITIALIZE APP
const express      = require('express');
const app          = express();
const mongoose     = require('mongoose');
const passport     = require('passport');
const flash        = require('connect-flash');
const session      = require('express-session')
const configDB     = require('./config/database.js');

//CONFIGURE APP
const port = process.env.PORT || 4200;
mongoose.connect(configDB.url); // connect to our database
require('./config/passport.js')(passport); // pass passport for configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set('view engine', 'ejs');
app.use(session({ secret: 'mylittledirtyasssecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app, {
  passport: passport
});

app.listen(port,()=>{
  console.log('The magic happens on port ' + port);
});
