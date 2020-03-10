import React, { Component } from "react";
import "./App.css";
import GetPosts from "./components/posts/GetPosts";

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1 className="projectheader">Reddit shower thoughts</h1>
                <GetPosts />
            </div>
        );
    }
}

export default App;
