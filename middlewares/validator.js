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