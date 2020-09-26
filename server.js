const express = require('express')
const app = express()
const request = require('request')
const fs = require('fs')

var edamamApi = "https://api.edamam.com/search";
var app_id = "";
var app_key = "";

// Set app_id and app_key
app_id = fs.readFileSync('app_id.txt');
app_key = fs.readFileSync('app_key.txt');

app.get('/test', (req,res) => {
    res.send({hello: 'Hello, World!'});
});

function requestApi(res, ingr) {
    var ingredients = ingr;

    var api_request = edamamApi +
                    "?q=" + ingredients +
                    "&app_id=" + app_id +
                    "&app_key=" + app_key;
    
    request(api_request, {json: true}, (error, response, body) => {
        var recipe = body.hits[0].recipe;
        var simple_recipe = {
            "label": recipe.label,
            "image": recipe.image,
            "url": recipe.url,
            "yield": recipe.yield,
            "ingredients": recipe.ingredients,
            "totalNutrients": recipe.totalNutrients,
            "calories": recipe.calories
        }
        res.send(simple_recipe);
    });
}

app.get('/api/:ingr', (req, res) => {
    requestApi(res, req.params.ingr);
});

port = process.env.PORT || 5000;
app.listen(port, () => { console.log('Listening on port ${port}')});