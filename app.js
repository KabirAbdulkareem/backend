
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');


const app = express();

mongoose.connect('mongodb+srv://kabir:biV4aEcHtIwcuZf2@cluster0-bd9c3.mongodb.net/recipe?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

//Handling CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//using body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//(1) Returns all recipes in database
app.get('/api/recipes', (req, res, next) => {
    Recipe.find()
    .then((recipes) => {
        res.status(200).json(recipes);
    })
    .catch((error) => {
        res.status(404).json({
            error:error
        })
    })
});


//(2) Returns the recipe with the provided ID from the
app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({_id:req.params.id})
    .then((recipe) =>{
        res.status(200).json(recipe);
    })
    .catch((error) => {
        res.status(404).json({
            error:error
        })
    })
});


//(3) Adds a new recipe to the database
app.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe({    
        title: req.body.title,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        time: req.body.time,
        difficulty: req.body.difficulty 
    });

    recipe.save()
    .then(() => {
        res.status(201).json({
            message: 'Recipee saved'
        })
    }).catch((error) => {
        res.status(400).json({
            error:error
        })
    })

});


//(4) Modifies the recipe with the provided ID
app.put('/api/recipes/:id', (req, res, next) => {

    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        time: req.body.time,
        difficulty: req.body.difficulty
    });
    Recipe.updateOne({_id: req.params.id}, recipe)
    .then((recipe) => {
      res.status(201).json({
        message: 'Recipe updated successfully'
      });
    })
    .catch((error) => {
      res.status(404).json({
        error:error
      })
    })
    
  })


//(5) deletes the recipe with the provided ID
app.delete('/api/recipes/:id', (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Recipe deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


// This middle ware handles all route OPTIONS
app.use('/api/recipes', (req, res, next) => {
    Recipe.find()
    .then((recipes) => {
        res.status(200).json(recipes);
    })
    .catch((error) => {
        res.status(404).json({
            error:error
        })
    })
});



  
module.exports = app;