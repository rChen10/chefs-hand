import React, { Component } from "react";

class ChefHandApp extends Component {
  state = {
    ingredients: [""],
    recipes: []
  };

  // Helper Functions
  addRecipe = (res) => {
    this.setState((prevState) => ({
      ingredients: prevState.ingredients,
      recipes: [...prevState.recipes, res]
    }))
  };

  addIngredient = (e) => {
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, ""],
      recipes: prevState.recipes
    }))
  };

  // Event Handlers
  ingredientSubmitHandler = (event) => {
    event.preventDefault();
    var recipe = this.callBackendAPI(this.state.ingredients);
  };

  ingredientChangeHandler = (event) => {
    let ingredients = [...this.state.ingredients];
    ingredients[event.target.dataset.id] = event.target.value;
    this.setState({ingredients});
  };

  // Backend functions
  componentDidMount() {
  }

  callBackendAPI = async (ingredients) => {
    const response = await fetch("/api/" + ingredients[0]);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body.url)
    this.addRecipe(body);
  };

  // Render
  render() {
    let {ingredients} = this.state, {recipes} = this.state;
    return (
      <div>
        <h1> Chef's Hand </h1>
        <form onSubmit={this.ingredientSubmitHandler} onChange={this.ingredientChangeHandler}>
          <label htmlFor="Ingredient">Ingredient</label>
          {
            ingredients.map((ing, indx) => {
              let ingId = 'ingredient$(indx)';
              return(
                <input type="text" name="Ingredient" data-id={indx} id={"ingredient" + indx} />
              );
            })
          }
          <button onClick={this.addIngredient}> Add new ingredient</button>
          <input type="submit" value="Submit" />
        </form>
        <p>
          {
            recipes.map((rec, indx) => {
              return(
                <div data-id={indx} id={"recipe" + indx}>
                <a href={rec.url}> Here is your recipe.</a>
                </div>
              );
            })
          }
        </p>
      </div>
    );
  }
}

export default ChefHandApp;
