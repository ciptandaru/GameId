const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const UserController = require('../controllers/userController')

router.get('/', Controller.readHome)

const ceklogin = function (req,res,next) {
    if(req.session.userid) {
        res.redirect('/home');
    } else {
        next();
    }
}

router.get('/', (req,res)=>{
    res.redirect('/login');
});

router.get('/login',ceklogin, UserController.renderLogin)
router.post('/login', UserController.postLogin)
router.get('/register',ceklogin, UserController.renderRegister)
router.post('/register', UserController.postRegister)


router.use((req, res, next) => {
    if(!req.session.userid){
        res.redirect("/login?errors=Please Login First!")
    } else {
        next()
    }
})

router.get('/logout', (req,res)=>{
    if (req.session) {
        req.session.destroy();
        res.redirect('/login');
    }
})

router.get('/home', (req,res)=>{
    if(req.session.role === "buyyer") {
        res.redirect('/buyyer');
    } else {
        res.redirect('/seller');
    }
})


const cekBuyer = function (req,res,next) {
if(req.session.role === "seller") {
        res.redirect('/home');
    } else {
        next();
    }
}

const cekSeller = function (req,res,next){
    if(req.session.role === "buyyer"){
        res.redirect('/home');
    } else {
        next();
    }   
}
// penjual
//sipenjual ini dia bisa nge add game dan delete game dan update game pricenya
// ===========================BUYER================================
router.get('/buyyer', cekBuyer, Controller.readGame)
router.get('/buyyer/games/order',cekBuyer,)
router.get('/buyyer/games/cart',cekBuyer,)
router.get('/buyyer/games/:id',cekBuyer,)
// pembeli
// si pembeli cuma bisa beli game add to cart, total harga, dan discount tertentu
// ============================SELLER===============================
router.get('/seller',cekSeller,)
router.get('/seller/games/add',cekSeller,)
router.post('/seller/games/add',)
router.get('/seller/games/:id/edit',cekSeller,)
router.post('/seller/games/:id/edit',)
router.get('/seller/games/:id/edit',cekSeller,)
router.post('/seller/games/:id/delete',)




module.exports = router