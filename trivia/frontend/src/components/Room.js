import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        const getRoomDetails = async () => {
            try {
                const response = await fetch(`/api/get-room?code=${roomCode}`);
                const data = await response.json();
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        getRoomDetails();
    }, [roomCode]);

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
};

export default Room;