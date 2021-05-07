
const {validationResult,body} = require('express-validator');
const { DateTime } = require("luxon");

// check if id is valid or not
exports.validateId = (req,res,next) => {
    console.log("validator called");
    let id = req.params.id;
    if(id.match(/^[0-9a-fA-F]{24}$/)){
        next();
    }else{
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
}

exports.validateSignup = [body('firstName','First name cannot be empty').notEmpty().isLength({min:3}).trim().escape(),
body('lastName','Last name cannot be empty').notEmpty().isLength({min:3}).trim().escape(),
body('email','Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password','password must be atleast 8 character and atmost 64 character').isLength({min:8,max:64})];

exports.validateLogin = [body('email','Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password','password must be atleast 8 character and atmost 64 character').isLength({min:8,max:64})];

exports.validateResult = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(e => {
            req.flash('error',e.msg);
        });
        return res.redirect('back');
    }else{
        return next();
    }
};

exports.validateEvent = [
    body('title', 'title should be atleast 3 character long (except trailling spaces)').notEmpty().bail().trim().isLength({min:3}).escape(),
    body('category', 'category should be atleast 3 character long (except trailling spaces)').notEmpty().bail().trim().isLength({min:3}).escape(),
    body('details', 'detail should be atleast 10 character long (except trailling spaces)').notEmpty().bail().trim().isLength({min:10}).escape(),
    body('date', 'date should be in future (not today or past) and should be valid').notEmpty().bail().trim().escape().custom((value, {req}) => checkDate(value)),
    body(['endTime','startTime'],' Please provide valid time').notEmpty().bail().trim().escape().custom((value, {req}) => checkValidTime(value)),
    body('endTime', 'end time should be after start time and event should be atleast 5 mins long').notEmpty().bail().trim().escape().custom((value, {req}) => checkStartAndEndTime(req.body.startTime,value)),
    body('image', 'image should be a valid URL').notEmpty().bail().trim().isURL(),
];

// check valid time
function  checkValidTime(value){
    console.log("checking valid time")
    console.log("value=>",value);
    let d = DateTime.fromFormat(value, "HH:mm");
    console.log("d=>",d);
    if (d.isValid){
        return true;
    }
    throw new Error(value+' Please provide valid time');
}


// for validating if date is greater than the current date.
function checkDate(date){
    // console.log("validating date=>",date);
    let d = DateTime.fromSQL(date);
    if (d){
        var now = DateTime.now();
        if (d>now){
            return true;
        }
    }
    return false
};

// check if start time is less than the end time
function checkStartAndEndTime(start,end){
    console.log("starttime=>",start,"endtime=>",end);
    let st = DateTime.fromFormat(start, "hh:mm");
    let et = DateTime.fromFormat(end,"hh:mm");
    if(st && et){
        // console.log("difference between=>",et-st);
        if (st>=et || (et-st)<=300000){
            return false;
        }
    }
    return true;
};

// Date.parse('25/09/2013 13:31') > Date.parse('25/09/2013 9:15')
