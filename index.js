const express = require('express')
const app = new express()
const ejs = require('ejs')
app.set('view engine','ejs')
const mongoose = require('mongoose')
mongoose.connect('mongoose.connect(mongodb+srv://amine:Sup5spe3irisi@cluster0-vxjpr.mongodb.net/BlogDb', {useNewUrlParser: true});
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const expressSession = require('express-session')
app.use(expressSession({
    secret: 'keyboard cat',
    proxy: true,
    resave: true,
    saveUninitialized: true
}))
const validateMiddleware = require("./middleware/validateMiddleware");
const flash = require('connect-flash')
app.use(flash())
const homeController = require('./controllers/home')
app.get('/',homeController)
const storePostController = require('./controllers/storePost')
const newPostController = require('./controllers/newPost')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
app.get('/posts/new',authMiddleware,newPostController)
app.post('/posts/store', authMiddleware, storePostController)
const getPostController = require('./controllers/getPost')
app.get('/post/:id',getPostController)
const newUserController = require('./controllers/newUser')
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const storeUserController = require('./controllers/storeUser')
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)
const loginController = require('./controllers/login')
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);
const loginUserController = require('./controllers/loginUser')
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)
global.loggedIn = null;
app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});
const logoutController = require('./controllers/logout')
app.get('/auth/logout',logoutController)
app.use((req, res) => res.render('notfound'))
let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
}) 
