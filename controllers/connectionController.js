const model = require('../models/connection');
const {DateTime} = require("luxon");

//GET /connections: send all the connection
exports.showAll = (req,res)=>{
    let allConnections = model.allConnections();
    // modify for the view
    let output = {};
    allConnections.forEach(conn =>{
        if(output[conn.category]){
            output[conn.category].push(conn);
        }else{
            output[conn.category] = [conn];
        }
    });
    // res.send('you should get all stories from here');
    res.render('./connection/showAll',{output});
};

//GET /connections/:id send specific connection
exports.findById = (req,res,next)=>{
    let output = model.FindConnectionByID(req.params.id);
    if(output){
        res.render('./connection/show',{output});
    }else{
        let err = new Error("cannot find connection with "+req.params.id);
        err.status = 404;
        next(err);
    }
};

//GET /connections/:id/edit send edit page for specific connection
exports.editById = (req,res,next)=>{
    let output = model.FindConnectionByID(req.params.id);
    if(output){
        res.render('./connection/edit',{output});
    }else{
        let err = new Error("cannot find connection with "+req.params.id);
        err.status = 404;
        next(err);
    }
    // res.send("send the connection edit page for id=>"+req.params.id);
};

//POST /connections/:id edit the specific connection
exports.updateById = (req,res)=>{
    let bool = model.UpdateConnectionById(req.params.id,req.body);
    if(bool){
        let url = '/connections/'+req.params.id
        res.redirect(url);
    }else{
        let err = new Error("cannot find connection with "+req.params.id);
        err.status = 404;
        next(err);
    }
    // res.send("edit the connection for id=>"+req.params.id);
};

//DELETE /connections/:id delete the specific connection
exports.deleteById = (req,res)=>{
    let bool = model.DeleteConnectionById(req.params.id);
    if(bool){
        res.redirect('/connections');
    }else{
        let err = new Error("cannot find connection with "+req.params.id);
        err.status = 404;
        next(err);
    }
    // res.send("delete the connection for id=>"+req.params.id);
};

//GET /connections/new send new connection form
exports.new = (req,res)=>{
    res.render('./connection/new');
};

//POST /connections create new connection
exports.createConnection = (req,res)=>{
    console.log("body=>",req.body);
    model.save(req.body);
    res.redirect('/connections');
    // res.send("from this point new connection should be created.")
};