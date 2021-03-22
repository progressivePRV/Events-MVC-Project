//GET /: send index page or home page
exports.index = (req,res)=>{
    res.render('index')
};

//GET /contact: send contact page
exports.contact = (req,res)=>{
    res.render('contact')
};

//GET /about: send about page
exports.about = (req,res)=>{
    res.render('about')
};