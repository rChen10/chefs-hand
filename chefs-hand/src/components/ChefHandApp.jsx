import React, { Component } from "react";

class ChefHandApp extends Component {
  state = {
    urls: [],
  };

  apiState = (res) => {
    this.state.urls.push(res.url);
    this.setState(this.state);
  };

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
    return (
      <div>
        <h1> lol </h1>
        <p>
          <a href={this.state.urls[0]}>Here is your recipe.</a>
        </p>
      </div>
    );
  }
}

export default ChefHandApp;
