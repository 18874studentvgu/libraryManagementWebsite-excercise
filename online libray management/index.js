const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

//idk what this is 
app.use(expressSession({
    secret: 'keyboard cat'
}))

//controller
const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const loginController = require('./controllers/login')
const authController = require('./controllers/authUser')
const registerController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const storeReviewController = require('./controllers/storeReview')
const loginAdminController = require('./controllers/loginAdmin')
const authAdminController = require('./controllers/authAdmin')
const regisAdminController = require('./controllers/regisAdmin')
const storeAdminController = require('./controllers/storeAdmin')
const emailConfPageController = require('./controllers/emailConfPage')
const sendConfLinkController = require('./controllers/sendConfLink')
const resetPasswordPageController = require('./controllers/resetPasswordPage')
const resetPasswordController=require('./controllers/resetPassword')
const userProfileController=require('./controllers/userProfile')
const userProfileSettingController=require('./controllers/userProfileSetting')
const bookInfoController=require('./controllers/bookInfo')
const logout=require('./controllers/logout')
const wishlist = require('./controllers/AddToWishlist')
const updateAccount = require('./controllers/updateAccount')
const borrow = require('./controllers/BorrowBook')
const adminDashboard = require('./controllers/admin/dashboard')
const adminUserDashboard = require('./controllers/admin/usersList')
const adminBookDashboard = require('./controllers/admin/booksList')
const adminAddBook = require('./controllers/admin/addBook')
const adminAddUser = require('./controllers/admin/addUser')
const adminStoreBook = require('./controllers/admin/storeBook')
const adminStoreUser = require('./controllers/admin/storeUser')
const adminGetBook = require('./controllers/admin/getBook')
const adminGetUser = require('./controllers/admin/getUser')
const adminGetEditBook = require('./controllers/admin/getEditBook')
const adminStoreEditBook = require('./controllers/admin/storeEditBook')
const adminGetEditUser = require('./controllers/admin/getEditUser')
const adminStoreEditUser = require('./controllers/admin/storeEditUser')
const adminLoggedInCheck = require('./middleware/adminValidationMiddleware')
const adminWarnDeleteBook = require('./controllers/admin/warnDeleteBook')
const adminDeleteBook = require('./controllers/admin/deleteBook')
const adminWarnDeleteUser = require('./controllers/admin/warnDeleteUser')
const adminDeleteUser = require('./controllers/admin/deleteUser')

//check logged in and newuser
global.loggedIn = null;
global.user1= null;
global.loggedInAdmin= null;
app.use('*', (req, res, next) => {    
    loggedIn = req.session.userId;
    next()
});

global.userid = null;
console.log(userid)

    


//cookies
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 
mongoose.connect('mongodb://0.0.0.0:27017/web', {useNewUrlParser: true}) 


app.set('view engine','ejs')

//real time update
io.on("connection", function(socket){
    //console.log("user connected");
    socket.on("new_comment", function(reviews, userName, body, rating){
        io.emit("new_comment", reviews, userName, body, rating);
    })

    socket.on("new_button", function(button){
        io.emit("new_button", button);
    })

    
    socket.on("0", function(button){
        io.emit("0", button);
    })
    
    socket.on("1", function(button){
        io.emit("1", button);
    })

    socket.on("2", function(button){
        io.emit("2", button);
    })

    socket.on("3", function(button){
        io.emit("3", button);
    })

    socket.on("4", function(button){
        io.emit("4", button);
    })

    socket.on("5", function(button){
        io.emit("5", button);
    })

    socket.on("6", function(button){
        io.emit("6", button);
    })

    socket.on("7", function(button){
        io.emit("7", button);
    })

    socket.on("8", function(button){
        io.emit("8", button);
    })

    socket.on("9", function(button){
        io.emit("9", button);
    })
});

app.use(express.static('public'))

http.listen(3000, () => {
    console.log("App listening on port 3000")
}) 

//home and post preview
app.get('/', homeController)
app.get('/index', homeController)

//get
app.get('/about', aboutController)

//contact
app.get('/contact', contactController)

//login
app.get('/auth/login', loginController)

//authUser
app.post('/users/login', authController)

//register
app.get('/auth/register', registerController)

//storeUser
app.post('/users/register', storeUserController)

//loginAdmin
app.get('/auth/loginAdmin', loginAdminController)

//authAdmin
app.post('/admins/loginAdmin', authAdminController)

//regisAdmin
app.get('/auth/regisAdmin', regisAdminController)

//storeAdmin
app.post('/admins/regisAdmin', storeAdminController)

//email confirmation page
app.get('/reset', emailConfPageController)

//send confirmation link to email
app.post('/reset/sendLink', sendConfLinkController)

//check token, id, user, then redirect to reset password
app.get('/reset/:id/:token', resetPasswordPageController)

//after user types in the new password, click reset
app.post('/reset/:id/:token', resetPasswordController)

//userprofile
app.get('/user_profile', userProfileController)
app.get('/user_profile_setting', userProfileSettingController)

//update account
app.post('/users/change', updateAccount)

//logout
app.get('/auth/logout', logout)

//bookInfo
app.get('/book-info/:id', bookInfoController)

//store user review
app.post('/users/review', storeReviewController)

//add to wishlist
app.post('/users/wishlist', wishlist)

//borrow 
app.post('/users/borrow', borrow)

//admin dashboard
app.get('/adminDashboard', adminDashboard)

//admin users dashboard
app.get('/adminUsersList', adminUserDashboard)

//admin books dashboard
app.get('/adminBooksList', adminBookDashboard)

//admin add book function
app.get('/adminBooksList/addBook', adminAddBook)

//admin add user function
app.get('/adminUsersList/addUser', adminAddUser)

//store Book's information from admin
app.post('/admin/storeBook', adminStoreBook)

//store User's information from admin
app.post('/admin/storeUser', adminStoreUser)

//get details about a Book from admin
app.get("/adminBooksList/:id", adminGetBook)

//get details about an User from admin
app.get("/adminUsersList/:id", adminGetUser)

//get page to edit a Book as an Admin
app.get("/adminBooksList/edit/:id", adminGetEditBook)

//store an edited Book as an Admin
app.post("/admin/storeEditBook/:id", adminStoreEditBook)

//get page to edit a User as an Admin
app.get("/adminUsersList/edit/:id", adminGetEditUser)

//store an edited User as an Admin
app.post("/admin/storeEditUser/:id", adminStoreEditUser)

//confirmation to delete a Book as an Admin
app.get("/adminBooksList/deleteWarn/:id", adminWarnDeleteBook)

//send request to delete a Book as an Admin
app.post("/admin/deleteBook/:id", adminDeleteBook)

//confirmation to delete a User as an Admin
app.get("/adminUsersList/deleteWarn/:id", adminWarnDeleteUser)

//send request to delete a Useras an Admin
app.post("/admin/deleteUser/:id", adminDeleteUser)

//error page
app.use((req, res) => res.render('404')); 