const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    title: {type:String, require:true},
    ingredients: {type:String, require:true},
    instructions: {type:String, require:true},
    difficulty: {type:Number, require:true},
    time: {type:Number, require:true},
  });

  module.exports = mongoose.model('Recipe', recipeSchema);