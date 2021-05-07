// require module
const express = require('express'); // express micro server
const morgan = require('morgan'); //  log creator
const methodOverride = require('method-override'); // method convertor e.g.: POST to DELETE
const session = require('express-session'); // for session handling in express
const mongoose = require('mongoose'); // Schema creator for mongoDB
const MongoStore = require('connect-mongo'); // helpful in storing session in mongodb
const flash = require('connect-flash'); // in memory storage for short messages, used for notifications
// routes
const connectionRoutes = require('./routes/connectionRoutes'); 
const mainRoutes = require('./routes/mainRoute');
const userRoutes = require('./routes/userRoute');



//create app
const app = express();

//configure app
const port = 3000;
const host = 'localhost';
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/MVC_DB',{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(()=>{
    // if successful
    //start the server
    app.listen(port,host,()=>{
        console.log("check out http://"+host+":"+port);
    });
})
.catch(err => console.log(err));


//mount middleware
app.use(express.static('public')); // for serving static conetent from Public directory 
app.use(express.urlencoded({extended:true})); // for accessing POST form body parameter
app.use(morgan('tiny')); // using logging module with tiny details
app.use(methodOverride('_method')); // using  method override for overiding POST http methods with other methods.
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  }); // stoping cache


// adding session mechanisam to server
// create session id with secret key to store in cookie
// store session on MongoDB
app.use( 
    session({
        secret: "asd123sdf456dfg789",  
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 60*60*1000},
        store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/MVC_DB'})
    })
);
app.use(flash()); // using flash as in memory storage for messages

app.use((req, res, next)=>{
    res.locals.userInfo = req.session.userInfo || null; // storing user's information from session to response
    res.locals.errorMessages = req.flash('error'); // getting error messages in response
    res.locals.successMessages = req.flash('success');// storing success messages in response
    next();
});


//set up routes
app.use('/',mainRoutes);
app.use('/connections',connectionRoutes);
app.use('/users',userRoutes);

app.use((req,res,next)=>{
    let err =  new Error('The server cannot locate '+ req.url);
    err.status = 404;
    next(err);
});

app.use((err, req,res,next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal server Error");
    }
    res.status(err.status);
    res.render('error',{error:err});
});



