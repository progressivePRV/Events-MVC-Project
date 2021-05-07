// const { findByIdAndDelete } = require('../models/connection');
const model = require('../models/connection');
const model_rsvp = require('../models/rsvp');

//GET /connections: send all the connection
exports.showAll = (req,res,next)=>{
    model.find()
    .then(events => {
        // creating outpu structure to show on events page
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

//GET /connections/new send new connection form
exports.new = (req,res)=>{
    console.log("sending new events page");
    res.render('./connection/new');
};

//POST /connections create new connection
exports.createConnection = (req,res,next)=>{
    let event = new model(req.body);
    console.log("testing session in create connection\n=>",req.session.userInfo);
    event.hostName = req.session.userInfo['id'];
    event.save()
    .then(event=>{
        req.flash('success','Event Created!');
        res.redirect('/connections');
    })
    .catch(err =>{
        if(err.name === 'ValidationError'){
            err.status = 400;
            req.flash('error',err.message);
            res.redirect('back');
        }else{
            next(err);
        }
        // next(err);
    });
};

//GET /connections/:id send specific connection
exports.findById = (req,res,next)=>{
    let id = req.params.id;
    // if(!id.match(/^[0-9a-fA-F]{24}$/)){
    //     let err = new Error('Invalid event id '+id);
    //     err.status = 400
    //     return next(err);
    // }

    Promise.all([model.findById(id).populate('hostName', 'firstName lastName'),model_rsvp.find({event:id,commitment:'yes'}).countDocuments()])
    .then(result => {
        const [event, rsvps] = result;
        if(event){
            let output = event.toObject();
            output.rsvps = rsvps;
            console.log("output =>",output);
            res.render('./connection/show',{output});
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
    // if (!id.match(/^[0-9a-fA-F]{24}$/)){
    //     let err = new Error('Invalid event id '+id);
    //     err.status = 400;
    //     return next(err);
    // }
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
    // if (!id.match(/^[0-9a-fA-F]{24}$/)){
    //     let err = new Error('Invalid event id '+id);
    //     err.status = 400;
    //     return next(err);
    // }

    model.findByIdAndUpdate(id,req.body,{useFindAndModify:false, runValidators:true})
    .then(event=>{
        if(event){
            let url = '/connections/'+id;
            req.flash('success','event updated!');
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
    // if (!id.match(/^[0-9a-fA-F]{24}$/)){
    //     let err = new Error('Invalid event id '+id);
    //     err.status = 400;
    //     return next(err);
    // }

    Promise.all([model.findByIdAndDelete(id), model_rsvp.deleteMany({event:id})]) 
    .then(result =>{
        const [event,dels] = result;
        if(event){
            req.flash('success','event Deleted!');
            res.redirect('/connections');
        }else{
            let err = new Error('cannot find event with id '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => console.log(err));
};

exports.doRSVP = (req,res,next)=>{
    let id = req.params.id;
    let commitment = req.query.commitment;
    if(commitment){
        commitment = commitment.toLowerCase();
    }
    let userId = req.session.userInfo['id'];
    let g_rsvp = {};
    g_rsvp['user'] = userId;
    g_rsvp['event'] = id;
    g_rsvp['commitment'] = commitment;
    console.log("rsvp=>",g_rsvp);
    // check if user has already RSVPed to event or not
    model_rsvp.findOne({event:id,user:userId})
    .then(rsvp => {
        if(rsvp){ 
            console.log("rsvp exists");
            if(rsvp.commitment===commitment){
                console.log("commitment is same no change");
                // replace current rsvp
                req.flash('success','Same RSVP responses is already present!'); 
                res.redirect('/users/profile');
            }else{
                console.log("update rsvp as commitment is changed");
                //"replace the rsvp row"
                // let row = new model_rsvp(g_rsvp);
                model_rsvp.updateOne({event:id},{$set: {commitment:commitment}},{runValidators:true})
                .then( rsvp =>{
                    req.flash('success','RSVP change succesful!');
                    res.redirect('/users/profile');
                })
                .catch(err =>{
                    if(err.name === 'ValidationError'){
                        err.status = 400;
                        req.flash('error',err.message);
                        // next(err);
                        res.redirect('back');
                    }else{
                        next(err);
                    }
                });
            }
        }else{
            console.log("rsvp does not exist, create new one");
            // save whole new row(rsvp to event)
            let row = new model_rsvp(g_rsvp);
            console.log("going to creat new RSVP");
            row.save()
            .then( rsvp =>{
                console.log("new RSVP created");
                req.flash('success','RSVP succesful!');
                res.redirect('/users/profile');
            })
            .catch(err =>{
                console.log("err creating new RSVP");
                if(err.name === 'ValidationError'){
                    err.status = 400;
                    req.flash('error',err.message);
                    // next(err);
                    res.redirect('back');
                }else{
                    next(err);
                }
            });
        }    
    })
    .catch(err =>{
        next(err);
    });
}

exports.deleteRSVP = (req,res,next)=>{
    let id = req.params.id;
    let userId = req.session.userInfo['id'];
    model_rsvp.deleteOne({event:id, user:userId})
    .then(result =>{
        res.redirect('back');
    })
    .catch(err => next(err));
};
