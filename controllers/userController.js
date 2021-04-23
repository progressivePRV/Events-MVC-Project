const Connection = require('../models/connection');
const User = require('../models/user');

//get signup page
exports.signupPage = (req,res,next)=>{
    res.render("./user/signup");
};

//post signup request
exports.signup = (req,res,next)=>{
    let user =  new User(req.body);
    // console.log("user from sign up page=>\n",user);
    user.save()
    .then( ()=>{
        req.flash("success", "New account created, login in please");
        res.redirect('/users/login');
    })
    .catch(err => {
        if (err.name === 'ValidationError'){
            req.flash('error',err.message);
            return res.redirect('back');
        }
        if(err.code === 11000){
            req.flash('error','email address has been used');
            return res.redirect('back');
        }
        next(err);
    });
};

//get login page
exports.loginPage = (req,res,next)=>{
    res.render("./user/login");
};

//post login request
exports.login = (req,res,next)=>{
    let email = req.body.email;
    let password =  req.body.password;
    // get the user that matches email
    User.findOne({email:email})
    .then(user => {
        if(user){
            //user found
            //compare the password of the user
            user.comparePassword(password)
            .then(result => {
                if (result){
                    // password matched
                    // store user id and name in session
                    var t = {}
                    t['id'] = user.id;
                    t['name'] = user.firstName;
                    req.session.userInfo = t;
                    req.flash('success','you have successdully logged in');
                    res.redirect('/users/profile');
                }else{
                    // password didn't matched
                    req.flash('error', 'wrong Password!');
                    res.redirect('back');
                }
            })
            .catch(err => next(err));
        }else{
            // user does not exists
            req.flash('error','wrong email address!');
            res.redirect('back');
        }
    })
    .catch(err=> next(err));
};

//get profile
exports.profilePage = (req,res,next)=>{
    let id = req.session.userInfo['id'];
    Promise.all([User.findById(id), Connection.find({hostName:id})])
    .then(result=>{
        const [profile,events] = result;
        res.render("./user/profile", {profile,events});
    })
    .catch(err => next(err));
    // res.render("./user/profile");
};

//get logout
exports.dologout = (req,res,next)=>{
    req.session.destroy(err => {
        if(err){
            return next(err);
        }else{
            res.redirect('/users/login');
        }
    });
};
