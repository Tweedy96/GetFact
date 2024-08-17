import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JoinRoomPage = () => {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
    };

    const roomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: roomCode,
            }),
        };
        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate(`/room/${roomCode}`);
                } else {
                    setError("Room not found.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Grid container spacing={1} align={"center"}>
            <Grid item xs={12}>
                <Typography component="h4" variant="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    error={!!error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={roomButtonPressed}
                >
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/"
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    );
};

export default JoinRoomPage;