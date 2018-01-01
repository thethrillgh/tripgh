///////////////////////////////////////////
//Imported modules to use/////////////////
//////////////////////////////////////////

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://issifu.suhununu:openme12@ds161028.mlab.com:61028/heroku_xswvm03v', ['cities', 'users']);
var stripe = require("stripe")(
  "sk_test_xWYoUSXSZLlNHK0k4r0ekWxA"
);
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// function for generating uniqe code
function gen() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}

///////////////////////////////////////////
//Functions for authentication Logic///////
//////////////////////////////////////////

//deserialize and serielize user for pesistent login session
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    db.users.find({'_id': id}, function(err, user) {
        done(err, user);
    });
});

function generateHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validPassword(hash, password){
//    return bcrypt.compareSync(password, this.local.password);   
    return bcrypt.compareSync(hash, password);   
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/login')
}


//////////////////////////////////////
//Passport authentication Logic///////
//////////////////////////////////////

//local login logic
passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    },
  function(req, username, password, done) {
    process.nextTick(function(){
    db.users.findOne({ username: username }, function(err, user) {
      if (err) { 
           console.log('not in db')
          return done(err); 
      }
      if (!user) {
           console.log('no user found')
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if(user){
          var verified= validPassword(password, user.password);
      }
      if (!verified) {
           console.log('wrong password')
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }
      return done(null, user);
    });
    });
  }
));

//local signup logic
passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, username, password, done) {
        // asynchronous
        process.nextTick(function(){
        // checking to see if the user trying to login already exists
        db.users.findOne({ 'username' :  username }, function(err, user) {
            //check if email and lowercase
            var email = req.body.email;
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                // set the user's local credentials
                var newUser = {
                    'type': 'user',
                    'username': username,
                    'password': generateHash(password)
                }
                if(email){
                    email = email.toLowerCase();
                    newUser.email = email;
                }
                // save the user
                db.users.save(newUser, function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }   
        });
        });

    }));

//Facebook OAuth
passport.use(new FacebookStrategy({
    clientID: '186711008477679',
    clientSecret: '2a319240558b74dd0ee128fb0da7257a',
    callbackURL: "http://tripgh.com/api/auth/facebook/callback",
    passReqToCallback: true
  },
  function(req, token, refreshToken, profile, done) {
    // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            db.users.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if error connecting db
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user);
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = {
                        type: 'user',
                        facebook:{ }
                    };
                    
                    // set all of the facebook information in user model
                    newUser.facebook.id    = profile.id;                
                    newUser.facebook.token = token;                  
                    newUser.facebook.name  = profile.displayName; 
                    
                    // save our user to the database
                    db.users.save(newUser, function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });
        });
  }
));

//Twitter OAuth
passport.use(new TwitterStrategy({
    consumerKey: 'RKRjQnrdvylhyrZX9skDhs7CY',
    consumerSecret: 'cB5r8R5XUfWXgA7SHnI3btHnM4klT5jnwRTjkGAfjrKvM1VFkh',
    callbackURL: "http://tripgh.com/api/auth/twitter/callback",
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            db.users.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if error connecting db
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user);
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = {
                        type: 'user',
                        twitter:{ }
                    };
                    // set all of the facebook information in user model
                    newUser.twitter.id    = profile.id;                
                    newUser.twitter.token = token;                  
                    newUser.twitter.name  = profile.username; 
                    
                    // save our user to the database
                    db.users.save(newUser, function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });
        });
  }
));

//Google OAuth
passport.use(new GoogleStrategy({
    clientID: '876727676233-83c4c9lvmsrv1o0ug9objlqjn9fgh58m.apps.googleusercontent.com',
    clientSecret: 'uWcermqSHY3xc3OAmkrLGVly',
    callbackURL: "http://tripgh.com/api/auth/google/callback",
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            db.users.findOne({ 'google.id' : profile.id }, function(err, user) {

                // if error connecting db
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user);
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = {
                        type: 'user',
                        google:{ }
                    };
                    // set all of the facebook information in user model
                    newUser.google.id    = profile.id;                
                    newUser.google.token = token;                  
                    newUser.google.name  = profile.displayName; 
                    
                    // save our user to the database
                    db.users.save(newUser, function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });
        });
  }
));


/////////////////////////////////////////////////
//Passport authorize Logic to Link Accounts///////
/////////////////////////////////////////////////



////////////////////////////////////
//Router authentication Logic///////
///////////////////////////////////

//router for login form
router.post('/login',
  passport.authenticate('local-login', { successRedirect: '/api/success',
                                   failureRedirect: '/api/login',
                                   failureFlash: false })
);

//router for facebook auth
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/api/success',
        failureRedirect : '/api/login'
    }));

//router for twitter auth
router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/api/success',
                                     failureRedirect: '/api/login' }));


//router for google auth
router.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

// handle the callback after google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/api/success',
                                     failureRedirect: '/api/login' }));

//router for login form
router.post('/signup',
  passport.authenticate('local-signup', { successRedirect: '/api/success',
                                   failureRedirect: '/api/login',
                                   failureFlash: false })
);

//route for login fail
router.get('/login', function(req, res, next){
    res.send('fail')
});

//route for connect flash fail
router.get('/flash/', function(req, res, next){
//    req.flash('a', 'b')
//    req.flash('d', 'e')
    res.send(req.flash());
});

//route for check
router.get('/check', function(req, res, next){
    if(req.user){
        console.log('checking, user is '+req.session.passport.user)
        res.send('you are logged in ')
    }
    else{
        res.send('not logged in')
    }
});
//route for check
router.get('/logout', function(req, res, next){
    if(req.user){
        req.logout();
        res.send('you have been logged out ')
    }
    else{
        res.send('not logged in')
    }
});

//route for login success
router.get('/success', ensureAuthenticated, function(req, res, next){
    res.redirect("/profile")
});


//route for session item
router.get('/cookie', function(req, res, next){
    res.send(req.session.item)
});

//route for user
router.get('/user', ensureAuthenticated, function(req, res, next){
    db.users.findOne(
        {_id: db.ObjectId(req.session.passport.user)},
    
    function(error, user){
        if(error){
            res.send(error);
        }
        var username;
        if(user.facebook){
            username = user.facebook.name
        }
        else if(user.twitter){
            username = user.twitter.name
        }
        else if(user.google){
            username = user.google.name
        }
        else{
            username = user.username;
        }
        console.log('username '+JSON.stringify(user))
        db.users.find(
            { type: 'ticket',   'user': req.session.passport.user},

        function(error, tickets){
            if(error){
                res.send(error);
            }
            var r = {ticket: tickets, username: username};
            r.ticket.forEach(function(a){
                delete a._id;
                delete a.type;
                delete a.id;
                delete a.name;
                delete a.user;
            })
            res.json(r)
        });
    });
});





/////////////////////////////
//Ticket Logic//////////////
////////////////////////////

//Get all tickets
router.get('/tickets', function(req, res, next){
    db.cities.find(
        {}, 
        {"_id": 0, "destination": 1, "origin": 1, "days": 1, "fare": 1, 'dep_time': 1},
    
    function(error, tasks){
        if(error){
            res.send(error);
        }
        res.json(tasks);
    });
});

//Get specific ticket
router.get('/tickets/:origin/:destination/:day', function(req, res, next){
    db.cities.find(
        { 'origin':req.params.origin, 'destination': req.params.destination, 'days': req.params.day},
    
    function(error, ticket){
        if(error){
            res.send(error);
        }
        res.json(ticket);
    });
});








/////////////////////////////
//Stripe Payment Logic///////
////////////////////////////

//get payment, confirm and send ticket details
router.post('/tickets', function(req, res, next){
        var stripeToken = req.body.stripeToken;
        var charge = {
            amount: req.body.fare*100,
            currency: 'usd',
            card: stripeToken,
            metadata: {'email': req.body.emailadd}
        };
        stripe.charges.create(charge, function(err, charge){
           if(err){
               res.send(JSON.stringify(err));
           }  else {
               var item = {
                   type: 'ticket',
                   id: charge.id,
                   code: gen(),
                   name: req.body.name,
                   origin: req.body.origin,
                   destination: req.body.destination,
                   time: req.body.time,
                   fare: req.body.fare,
                   day: req.body.day,
               }
               if(req.user){
                   item.user=req.session.passport.user;
               }
               db.users.save(item, function(err) {
                    if (err)
                        throw err;
                });
               req.session.item=JSON.stringify(item);
               res.redirect("/receipt")
           }
        });
});

module.exports =  router;