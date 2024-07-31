import React, { Component } from "react";
import { render } from "react-dom";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HomePage />
                <CreateRoomPage />
                <JoinRoomPage />
                <JoinRoomPage />
                <JoinRoomPage />
                <JoinRoomPage />
                <JoinRoomPage />
                <JoinRoomPage />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);