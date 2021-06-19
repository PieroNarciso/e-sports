module.exports = {
    getUser: (req, res) => {
        res.send('User');    
    },

    loginUser: (req, res) => {
        res.render('login');
    },

    loginPostUser: (req, res) => {
        if (user)
            res.render('principal');
        else
            res.render('login', {msg: 'Usuario incorreccto'})
    }
}