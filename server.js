const express = require("express");
const app = express();
const request = require("request");
const fs = require("fs");

var edamamApi = "https://api.edamam.com/search";
var app_id = "";
var app_key = "";

// Set app_id and app_key
app_id = fs.readFileSync("app_id.txt");
app_key = fs.readFileSync("app_key.txt");

app.get("/test", (req, res) => {
  res.send({ hello: "Hello, World!" });
});

function requestApi(res, ingr) {
  var ingredients = ingr;

  var api_request =
    edamamApi + "?q=" + ingr + "&app_id=" + app_id + "&app_key=" + app_key +
      "&to=90";

  request(api_request, { json: true }, (error, response, body) => {
    if (body) {
      res.send({label: "dummy", message: "Server error. Please try again later."});
      return;
    }
    if (body.count > 0){
      var indx = Math.floor(Math.random() * (body.count >= 90 ? 90 : body.count));
      var recipe = body.hits[indx].recipe;
      var simple_recipe = {
        label: recipe.label,
        image: recipe.image,
        url: recipe.url,
        yield: recipe.yield,
        ingredients: recipe.ingredients,
        totalNutrients: recipe.totalNutrients,
        calories: recipe.calories,
        source: recipe.source,
      };
      res.send(simple_recipe);
    }
    else{
      res.send({label: "dummy", message: "No recipes found."});
    }
  });
}

app.get("/api", (req, res) => {
  requestApi(res, req.query.ingr);
});

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port ${port}");
});
