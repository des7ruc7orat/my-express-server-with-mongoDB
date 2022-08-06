const router = require('express').Router();

const api = require('../services/figureService');

const { auth, verifyToken } = require('../middlewares/authMiddleware');
const { default: mongoose } = require('mongoose');
router.get('/all', async (req, res) => {
    try {
        res.json(await api.getAllFigures())
    } catch (err) {
        res.status(400).json({ message: err })
    }

});

router.get('/details/:figureId', async (req, res) => {
    const figureId = req.params.figureId;

    try {
        const figure = await api.getOneFigure(figureId);

        // da widq dali kato horata sum go naprawil
        res.json(figure);
    } catch (err) {
        res.status(400).json({ message: err })
    }
});

router.get('/delete/:figureId', auth, async (req, res) => {
    const figureId = req.params.figureId;

    const result = await api.deleteFigureById(figureId);

    res.json(result)
});



router.get('/like/:figureId', auth, async (req, res) => {

    const figureId = req.params.figureId;

    const figure = await api.getOneFigure(figureId);

    figure.likes.push(req.user._id);

    await figure.save();


    res.json(figure);
});

router.put('/edit/:figureId', async (req, res) => {
    const figureId = req.params.figureId;

    const figureData = {
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        familyName: req.body.familyName,
        yearBorn: req.body.yearBorn,
        yearDied: req.body.yearDied,
        nickname: req.body.nickname,
        imageUrl: req.body.imageUrl,
        occupation: req.body.occupation,
        description: req.body.description,
    }

    // try {
    //     const result = await api.editFigureById(figureId, figureData);
    //     res.json(result);
    // } catch (error) {
    //         res.status(400).json({message:'Request error'})
    // }

    try {


        // const { firstName, secondName, yearBorn,
        //     yearDied, nickname, imageUrl, occupation, description } = req.body;

        // const data = {
        //     firstName, secondName, yearBorn,
        //     yearDied, nickname, imageUrl, occupation, description
        // };
        if (req.body.secondName == '') {
            req.body.secondName = 'None'
        }
        console.log(req.body.secondName);
        const result = await api.editFigureById(figureId, req.body);
        // const result = await api.editFigureById(figureId, figureData);
        //     res.json(result);

        // da widq dali kato horata sum go naprawil

        res.json(result);
    } catch (err) {
        res.status(400).json({ message: 'Request Error' })
    }
});




router.post('/create', auth, async (req, res) => {
    const { firstName, secondName, yearBorn,
        yearDied, nickname, imageUrl, occupation, description } = req.body;

    const data = {
        firstName, secondName, yearBorn,
        yearDied, nickname, imageUrl, occupation, description
    };

    // towa s userId da go mahna, ako ne raboti i da widq nachin
    // kak se slaga id w mongoDB
    // const userId = req.user?._id;
    // console.log(userId);
    try {
        //  ако на create пратя само data не става, трябва да пратя цял обект... не знам защо
        // const result = await api.createFigure({firstName,secondName,yearBorn,
        //     yearDied, nickname,imageUrl,occupation,description,creator:req.user._id},);
        const result = await api.createFigure({ ...req.body, creator: req.user._id });

        const user = await api.getUserId(req.user._id);

        console.log(result._id);
        user.createdFigures.push(result._id)
        await user.save();
        //  console.log(req.user._id +'towa e ot controler figure');
        res.json({ result })
        //   res.json({ok:true})
    } catch (err) {

        console.log(req.user);
        res.status(400).json({ message: err })
    }


});



module.exports = router;