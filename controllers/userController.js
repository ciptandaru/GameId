const {User, Profile} = require("../models")
const bcrypt = require('bcryptjs');

class UserController{
    static renderLogin(req,res){
        const errors = req.query.errors;
        res.render("login",{errors});
    }

    static postLogin(req,res){
        const {username, password} = req.body
        User.findOne({
            where: {
                username: username
            }
        })
        .then(user=>{
            if(user){
                const validPass = bcrypt.compareSync(password, user.password);
                if(validPass){
                    req.session.userid = user.id;
                    req.session.username = user.username;
                    req.session.role = user.role;
                    res.redirect("/home");
                } else {
                    res.redirect("/login?errors=invalid username or password");
                }
            } else {
                res.redirect("/login?errors=invalid username or password");
            }
        })
        .catch(err=>{
            if(err.name = "SequelizeValidationError"){
                let dataErr = err.errors.map(er =>{
                    return er.message;
                })
                res.redirect(`/login?errors=${dataErr}`);
            } else {
                res.send(err);
            }
        })
    }
    
    static renderRegister(req,res) {
        const errors = req.query.errors;
        res.render("register", {errors});
    }

    static postRegister(req,res) {
        const {username, password, role, name, address, phoneNumber, member } = req.body;
        // console.log({username, password, name, address,phoneNumber, role, member });
        User.create({username, password, role })
        .then(data=>{
            console.log(data);
            return Profile.create({name, address, phoneNumber, UserId: data.id, member})
        })
        .then(()=>{
            res.redirect("/login?success=Reguster+success!");
        })
        .catch(err=>{
            // if(err.name = "SequelizeValidationError") {
            //     err.errors.forEach(el => errors.push(el.message))
            //     res.redirect(`/register?errors=${errors}`)
            // } else {
                console.log(err);
                res.send(err);
            // }
        });
    }

    static renderHome (req,res) {
        console.log(req.session);
        res.send("MASHOK PAK EKO")
    }
}

module.exports = UserController