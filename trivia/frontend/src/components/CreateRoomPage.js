import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateRoomPage = (props) => {
    const navigate = useNavigate();
    const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
    const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    };

    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === "true");
    };

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate("/room/" + data.code));
    };

    const handleUpdateButtonPressed = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: props.roomCode,
            }),
        };
        fetch("/api/update-room", requestOptions).then((response) => {
            if (response.ok) {
                setSuccessMsg("Room updated successfully!");
            } else {
                setErrorMsg("Error updating room...");
            }
            props.updateCallback();
        });
    };

    const renderCreateButtons = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleRoomButtonPressed}
                    >
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    };

    const renderUpdateButtons = () => {
        return (
            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleUpdateButtonPressed}
                >
                    Update Room
                </Button>
            </Grid>
        );
    };

    const title = props.update ? "Update Room" : "Create a Room";

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={errorMsg !== "" || successMsg !== ""}>
                    {successMsg !== "" ? (
                        <Alert
                            severity="success"
                            onClose={() => {
                                setSuccessMsg("");
                            }}
                        >
                            {successMsg}
                        </Alert>
                    ) : (
                        <Alert
                            severity="error"
                            onClose={() => {
                                setErrorMsg("");
                            }}
                        >
                            {errorMsg}
                        </Alert>
                    )}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">Guest Control of Playback State</div>
                    </FormHelperText>
                    <RadioGroup
                        row
                        defaultValue={props.guestCanPause.toString()}
                        onChange={handleGuestCanPauseChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={true}
                        type="number"
                        onChange={handleVotesChange}
                        defaultValue={votesToSkip}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    <FormHelperText>
                        <div align="center">Votes Required To Skip Song</div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {props.update ? renderUpdateButtons() : renderCreateButtons()}
        </Grid>
    );
};

CreateRoomPage.defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => { },
};

export default CreateRoomPage;