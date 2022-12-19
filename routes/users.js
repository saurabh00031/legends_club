var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var passport=require('passport');
var bcrypt=require('bcryptjs');

var Schema1=require('../models/user')
var User= mongoose.model("users",Schema1);

/*
* GET register
*/

router.get('/register', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    res.render('register',{title:'Register',loggedIn:loggedIn,username: res.locals.username})
});

router.post('/register', async function(req,res){
   var name=req.body.name;
   var email=req.body.email;
   var username=req.body.username;
   var password=req.body.password;
   var password2=req.body.password2;
   var loggedIn=(req.isAuthenticated()) ? true :false;

    if(password != password2)
    {
        console.log("password do not match with confirm password");
        req.flash('danger','Password and Confirm Password do not match with each other');
        res.redirect('/users/register');


    }
    else
    {
            User.findOne({username :username}, function(err,user){
                if(err){
                    console.log("error in post register in users.js"+err);
                }  
                if(user)
                {

                     req.flash('danger','Username already exists');
                     res.redirect('/users/register');
                }
                else
                {
                            var user=new User({
                                name:name,
                                email:email,
                                username:username,
                                password:password,
                                admin:0
                            });
                            
                            bcrypt.genSalt(10, function (err, salt) 
                            {
                                bcrypt.hash(user.password, salt, function (err, hash) 
                                {
                                    if(err)
                                        console.log(err);
            
                                    user.password = hash;
            
                                    user.save(function (err) {
                                        if(err) 
                                        {
                                            console.log(err);
                                        } 
                                        else 
                                        {
                                            req.flash('success', 'User has been registered !');
                                            res.redirect('/users/login')
                                        }
                                    });
                                });
                            });
                        }
                    });
    }
});

// get login 
router.get('/login', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    if(res.locals.user){
        res.redirect('/');
    }
    res.render('login',{
        title:'Log In',
        loggedIn:loggedIn,
        username: res.locals.username
    })
 
});


router.post('/login', passport.authenticate('local',{
    failureRedirect:'/users/login',
    failureFlash:true
}), function(req,res,next){
    res.cookie('username',req.body.username, { maxAge: 900000, httpOnly: true });
    res.redirect('/')
});


router.get('/logout', async function(req,res)
{
   var loggedIn=(req.isAuthenticated()) ? true :false;
   req.logOut();
   res.clearCookie('username')
   req.flash('success',"Successfully logged out !!");
   res.redirect('/users/login');
});




module.exports=router;