const express = require('express')
const app = express()
const request = require('request')

app.get('/test', (req,res) => {
    res.send({hello: 'Hello, World!'});
});

function requestApi(res) {
    var ingredients = 'chicken';
    var edamamApi = "https://api.edamam.com/search";
    var app_id = "95632fc6";
    var app_key = "24317438a2ab57d35880553abaef8db0";

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

app.get('/api', (req, res) => {
    requestApi(res);
});

port = process.env.PORT || 5000;
app.listen(port, () => { console.log('Listening on port ${port}')});