import React, { Component } from "react";

class ChefHandApp extends Component {
  state = {
    ingredients: [""],
    recipes: [],
  };

  // Helper Functions
  addRecipe = (res) => {
    this.setState((prevState) => ({
      ingredients: prevState.ingredients,
      recipes: [...prevState.recipes, res],
    }));
  };

  addIngredient = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, ""],
      recipes: prevState.recipes,
    }));
  };

  // Event Handlers
  ingredientSubmitHandler = (event) => {
    event.preventDefault();
    var recipe = this.callBackendAPI(this.state.ingredients);
  };

  ingredientChangeHandler = (event) => {
    let ingredients = [...this.state.ingredients];
    ingredients[event.target.dataset.id] = event.target.value;
    this.setState({ ingredients });
  };

  // Backend functions
  componentDidMount() {}

  callBackendAPI = async (ingredients) => {
    const response = await fetch(
      "/api?ingr=" +
        ingredients.map((ingr, indx) =>
          indx === ingredients.length - 1 ? ingr : ingr + "+"
        )
    );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body);
    this.addRecipe(body);
  };

  // Render
  render() {
    let { ingredients } = this.state,
      { recipes } = this.state;
    return (
      <div>
        <h1> Chef's Hand </h1>
        <form
          onSubmit={this.ingredientSubmitHandler}
          onChange={this.ingredientChangeHandler}
        >
          <label htmlFor="Ingredient">Ingredient</label>
          {ingredients.map((ing, indx) => {
            let ingId = "ingredient$(indx)";
            return (
              <input
                type="text"
                name="Ingredient"
                data-id={indx}
                id={"ingredient" + indx}
              />
            );
          })}
          <button onClick={this.addIngredient}> Add new ingredient</button>
          <input type="submit" value="Submit" data-name="ingrSubmit" />
        </form>
        <div className="recipesArea">
          {recipes.reverse().map((rec, indx) => {
            return (
              <div data-id={indx} id={"recipe" + indx} className="simpleRecipe">
                <a href={rec.url} className="recipeLink">
                  <img
                    src={rec.image}
                    href={rec.url}
                    alt="An image of your requested recipe"
                    className="recipeImage"
                  ></img>
                </a>
                <a href={rec.url} className="recipeLink">
                  <h1 className="recipeLabel">{rec.label}</h1>
                </a>
                <ul>
                  <li>Recipe Source: {rec.source}</li>
                  <li>Yields: {rec.yield} Servings</li>
                  <li>Calories: {parseInt(rec.calories)}</li>
                  <li>
                    Ingredients:
                    {rec.ingredients.map((ingdnt) => {
                      return <p>{ingdnt.text}</p>;
                    })}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ChefHandApp;
