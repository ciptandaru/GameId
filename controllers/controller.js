const {Game, Order, Genre,GenreGame, Profile, User} = require('../models')

class Controller {
    static readHome(req, res) {
        Game.findAll({
            include: Genre
        })
        .then((data) => {
            res.render('home', {data})
        }).catch((err) => {
            res.send(err)
        });
    }

    static readGame (req, res) {
        Game.findAll({
            include: Genre
        })
        .then((result) => {
            // console.log(result);
            res.render('buyyer',{result})
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = Controller