var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var passport=require('passport');
var bcrypt=require('bcryptjs');



router.get('/', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    console.log("..............")
    console.log(res.locals.username)
    res.render('home',{title:'Home',loggedIn:loggedIn,username: res.locals.username })
});



router.get('/about', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    console.log("..............")
    console.log(res.locals.username)
    res.render('about',{title:'About',loggedIn:loggedIn,username: res.locals.username })
});



router.get('/orphanfund', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    console.log("..............")
    console.log(res.locals.username)
    res.render('orphanfund',{title:'Orphans Fund',loggedIn:loggedIn,username: res.locals.username })
});

router.get('/naturefund', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    console.log("..............")
    console.log(res.locals.username)
    res.render('naturefund',{title:'Nature Fund',loggedIn:loggedIn,username: res.locals.username })
});

router.get('/taskviewer', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    console.log("..............")
    console.log(res.locals.username)
    res.render('taskviewer',{title:'Task & activities',loggedIn:loggedIn,username: res.locals.username })
});


router.get('/womenfund', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    console.log("..............")
    console.log(res.locals.username)
    res.render('womenfund',{title:'Task & activities',loggedIn:loggedIn,username: res.locals.username })
});

router.get('/fundforpoor', async function(req,res)
{
    var loggedIn=(req.isAuthenticated()) ? true :false;
    console.log("..............")
    console.log(res.locals.username)
    res.render('fundforpoor',{title:'Task & activities',loggedIn:loggedIn,username: res.locals.username })
});












module.exports=router;
