// require module
const express = require('express');
const morgan = require('morgan');
const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoute');
const methodOverride = require('method-override');


//create app
const app = express();

//configure app
const port = 3000;
const host = 'localhost';
app.set('view engine','ejs');

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.use('/',mainRoutes);

app.use('/connections',connectionRoutes);

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


//start the server
app.listen(port,host,()=>{
    console.log("check out http://"+host+":"+port);
});
