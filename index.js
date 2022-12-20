var express=require('express');
var path=require('path');
var mongoose=require('mongoose');  //database
var bodyParser=require('body-parser');
var session=require('express-session');
var app=express();
var expressValidator=require('express-validator');
var fileUpload=require('express-fileupload');
var passport=require('passport');   //passport authentication
var cookieParser = require('cookie-parser')


app.set('views',path.join(__dirname,'views'));  //set views
app.set('view engine','ejs');                   //set engine --ejs




//set public folder
app.use(express.static(path.join(__dirname,'public')));

//set global errors variable
app.locals.errors=null;



//cookie-parser
app.use(cookieParser())

//express fileupload middleware
app.use(fileUpload());

//body parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//express session 
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));

//express messages 
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//passport config
require('./config/passport')(passport);
// passport 
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
    res.locals.username = req.user;
    next();
  });
  


var homes=require('./routes/home.js');
var users=require('./routes/users.js');


app.use('/',homes);
app.use('/users',users);



//giving the port number 
var port = process.env.PORT || 3000
app.listen(port,function(){
    console.log('server listening on ' +port  );
})