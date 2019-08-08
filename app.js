// Required Inported Technologies

const express                     =     require('express'),

      mongoose                    =  l  require('mongoose'),

      passport                    =     require('passport'),

      bodyParser                  =     require('body-parser'),

      //Requiring user model
      User                        =     require('./models/user'),

      LocalStrategy               =     require('passport-local'),

      passportLocalMongoose       =     require('passport-local-mongoose');




//Created Database
mongoose.connect('mongodb://localhost/auth_demo_app', { useNewUrlParser: true });



const app = express();
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//we have 3 app.use require express session, initialize session and run session
//secret : used to encode and decode the sessions
//we don't store data in sessions as encoded data not words
app.use(require('express-session')({
  secret:'Rusty is the best and cutest dog in the world',
  resave: false,
  saveUninitialized: false
}));
//

app.use(passport.initialize());
app.use(passport.session());

//They read the session taking data from session
//passport.serializeUser(User.serializeUser()) =>
//ending it, serizling and putting it back in the session
//passport.deserializeUser(User.deserializeUser()) =>
// reading the session, taking data from session that encoded and and decoding it
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//===========================
//Routes
//===========================

app.get('/', (req, res) =>{
res.render('home')
});

app.get('/secret',isLoggedIn, (req, res) =>{
  res.render('secret')
});

//Auth routes

app.get('/register', (req, res) =>{
  res.render('register')
});

//handling user signup

app.post('/register', (req, res) =>{
  req.body.username
  req.body.password
  //make a new user object that is not stored in DB yet
  //we only pass in username, password not stored in DB
  //we pass the password as the second argument of User.register().
  //it will hash (Scrambled)that password
  //it will return new user with username and hashed password
  User.register(new User({username: req.body.username}), req.body.password, (err, user) =>{
    if (err) {
      console.log(err)
      return res.render('register');
    }
      passport.authenticate('local')(req, res, ()=>{
        res.redirect('/secret');
      });
  });
});

//login routes
//render login form

app.get('/login', (req, res)=>{
  res.render('login')
});

//passport is part of argument
//known ass middleware: some code that runs before our final callback
app.post('/login', passport.authenticate('local', {
  successRedirect:'/secret',
  failureRedirect:'/login'
}) , (req, res) =>{
});

app.get('/logout', (req, res) =>{
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


app.listen(3000, (req, res) =>{
  console.log('Server has started')
})
