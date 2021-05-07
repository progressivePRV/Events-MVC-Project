const connection = require("../models/connection");

// check if user is guest
exports.isGuest = (req,res,next) =>{
    console.log("isGuest called");
    if(req.session.userInfo){
        req.flash("error", "You are logged in already");
        return res.redirect("/users/profile");
    }else{
        return next();
    }
};

//check if user is authenticated
exports.isLoggedIn = (req,res,next)=>{
    console.log("isLoggedIn called");
    if (req.session.userInfo){
        return next();
    }else{
        req.flash("error", "you need to log-in first");
        return res.redirect("/users/login");
    }
};

// check if user is the author of story
exports.isAuthor = (req,res,next)=>{
    console.log("isAuthor called");
    let id = req.params.id;
    // getting the event
    connection.findById(id)
    .then(event =>{
        // if event is present
        if (event){
            // if author of event and logged in user is same
            if(event.hostName == req.session.userInfo['id']){
                next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);  
            }
        }else{
            let err = new Error('cannot find event with id '+id);
            err.status = 404
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.isNotAuthor = (req,res,next)=>{
    console.log("isNotAuthor called");
    let id = req.params.id;
    // getting the event
    connection.findById(id)
    .then(event =>{
        // if event is present
        if (event){
            // if author of event and logged in user is same
            if(event.hostName == req.session.userInfo['id']){
                let err = new Error('Unauthorized action');
                err.status = 401;
                return next(err); 
            }else{
                 next();
            }
        }else{
            let err = new Error('cannot find event with id '+id);
            err.status = 404
            next(err);
        }
    })
    .catch(err => next(err));
};