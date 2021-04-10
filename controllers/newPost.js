module.exports = (req, res) =>{
    var title = ""
    var body = ""
    if(req.session.userId){
        const data = req.flash('data')[0];
        if(typeof data != "undefined"){
            title = data.title
            body = data.body
        }
        return res.render("create",
            {
                errors: req.flash('validationErrors'),
                title: title,
                body: body,
                createPost: true
            });
    }
    res.redirect('/auth/login')
    }