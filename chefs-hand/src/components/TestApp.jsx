import React, { Component } from 'react';

class TestApp extends Component {
    state = { data:null }

    componentDidMount() {
      // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({ data: res.hello }))
            .catch(err => console.log(err));
    }

    callBackendAPI = async () =>{
        const response = await fetch('/test');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    }

    render() { 
        return (<div>
                    <h1> lol </h1>
                    <p> {this.state.data} </p>
                </div>);
    }
}
 
export default TestApp;