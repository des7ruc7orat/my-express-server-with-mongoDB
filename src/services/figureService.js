const Figure = require('../models/Figure');
const User = require('../models/User');

async function getAllFigures(){
    try {
        return Figure.find({});
    } catch (error) {
      return  res.status(400).json({message: error})
    }
   
}

async function deleteFigureById(figureId){

    return Figure.findByIdAndDelete(figureId);
}

 async function getUserId (userId){

    return await User.findById(userId)
}

 function editFigureById(figureId,figureData){

     return  Figure.findByIdAndUpdate(figureId,figureData,{runValidators:true});

  //  const existing = await Figure.findById(figureId);

    // if(existing){
    //     existing.firstName = figureData.firstName;
    //     existing.secondName = figureData.secondName;
    //     existing.familyName = figureData.familyName;
    //     existing.yearBorn = figureData.yearBorn;
    //     existing.yearDied = figureData.yearDied;
    //     existing.nickname = figureData.nickname;
    //     existing.imageUrl = figureData.imageUrl;
    //     existing.occupation = figureData.occupation;
    //     existing.description = figureData.description;

    //     await existing.save();
    //     return existing;
    // }else {
    //     throw new Error('Not Found')
    // }
}

 function createFigure(figureData){
    
        // try {
   
            return  Figure.create(figureData);
              
        // } catch (error) {
        //    //return res.status(400).json({message: error})
        //    alert('server err')
        // }
   
   
}

async function getOneFigure(figureId){
    return await Figure.findById(figureId).populate('creator');


}

exports.getOne =(figureId) => Figure.findById(figureId);


// exports.createFigure = ({figureData}) => Figure.create({figureData});

module.exports = {
    getAllFigures,
    createFigure,
    getUserId,
    getOneFigure,
    editFigureById,
    deleteFigureById,
}