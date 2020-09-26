import React, { Component } from "react";

class ChefHandApp extends Component {
  state = {
    ingredients: [""],
    urls: []
  };

  // Helper Functions
  apiState = (res) => {
    this.setState((prevState) => ({
      ingredients: prevState.ingredients,
      urls: [...prevState.urls, res.url]
    }))
  };

  addIngredient = (e) => {
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, ""],
      urls: prevState.urls
    }))
  };

  // Event Handlers
  ingredientHandler = (event) => {
    event.preventDefault();
  };

  // Backend functions
  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then((res) => this.apiState(res))
      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/api");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    let {ingredients} = this.state;
    return (
      <div>
        <h1> Chef's Hand </h1>
        <form onSubmit={this.ingredientHandler}>
          <label htmlFor="Ingredient">Ingredient</label>
          {
            ingredients.map((ing, indx) => {
              let ingId = 'ingredient${indx+1}';
              return(
                <input type="text" name="Ingredient" id={ingId} />
              );
            })
          }
          <button onClick={this.addIngredient}> Add new ingredient</button>
          <input type="submit" value="Submit" />
        </form>
        <p>
          <a href={this.state.urls[0]}>Here is your recipe.</a>
        </p>
      </div>
    );
  }
}

export default ChefHandApp;
