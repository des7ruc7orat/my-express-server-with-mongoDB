const router = require('express').Router();
const userSerice = require('../services/userService');

const {verifyToken} = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    // може да го направя и тук да не идва repeatPassword, а валидирането
    // да ми е на front-end-а(react). Но ще го направя и на двете.
    if (password !== repeatPassword) {
        return res.json({ message: 'Password must be same with the repeat one' });
    }
    try {

        const user = await userSerice.register( {username, email, password });
        
        
        res.status(201).json(user)
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message })
    }

});



router.post('/login',async (req, res) => {
    const { email, password } = req.body;
    // може да го направя и тук да не идва repeatPassword, а валидирането
    // да ми е на front-end-а(react). Но ще го направя и на двете.
    
    try {

        const user = await userSerice.login({email, password });
        req.user = user;
        res.json(user)
    
        
        
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message })
    }

});

router.get('/logout', (req,res) => {
    userSerice.logout(req.user.token);
    res.status(204).end();
});




module.exports = router;