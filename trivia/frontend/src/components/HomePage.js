import React, { Component } from "react";
import {
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<p>This is the home page</p>} />
                    <Route path="/join" element={<JoinRoomPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/room/:roomCode" element={<Room />} />
                </Routes>
            </Router>
        );
    }
}