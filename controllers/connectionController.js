const { findByIdAndDelete } = require('../models/connection');
const model = require('../models/connection');

//GET /connections: send all the connection
exports.showAll = (req,res,next)=>{
    model.find()
    .then(events => {
        let output = {};
        events.forEach(conn =>{
                if(output[conn.category]){
                    output[conn.category].push(conn);
                }else{
                    output[conn.category] = [conn];
                }
            });
        res.render('./connection/showAll',{output});
    })
    .catch(err => next(err));

};

//GET /connections/:id send specific connection
exports.findById = (req,res,next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id '+id);
        err.status = 400
        return next(err);
    }

    model.findById(id)
    .then(event => {
        if(event){
            res.render('./connection/show',{output:event});
        }else{
            let err = new Error('cannot find event with id '+id);
            err.status = 404
            next(err);
        }
    })
    .catch(err=>next(err));
};

//GET /connections/:id/edit send edit page for specific connection
exports.editById = (req,res,next)=>{
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id '+id);
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(event => {
        if(event){
            res.render('./connection/edit',{output:event});
        }else{
            let err = new Error('cannot find event with id '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//POST /connections/:id edit the specific connection
exports.updateById = (req,res,next)=>{
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id '+id);
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id,req.body,{useFindAndModify:false, runValidators:true})
    .then(event=>{
        if(event){
            let url = '/connections/'+id
            res.redirect(url);
        }else{
            let err = new Error('cannot find event with id '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err =>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};

//DELETE /connections/:id delete the specific connection
exports.deleteById = (req,res,next)=>{
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id '+id);
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id)
    .then(event =>{
        if(event){
            res.redirect('/connections');
        }else{
            let err = new Error('cannot find event with id '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => console.log(err));
};

//GET /connections/new send new connection form
exports.new = (req,res)=>{
    res.render('./connection/new');
};

//POST /connections create new connection
exports.createConnection = (req,res,next)=>{
    let event = new model(req.body);
    event.save()
    .then(story=>res.redirect('/connections'))
    .catch(err =>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};