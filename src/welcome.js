import React, { useState } from "react";
import { socket } from "./socket";

export default function Welcome() {
    localStorage.setItem("question_nr", 0);
    const [registered, setRegistered] = useState();

    const keyCheck = e => {
        if (e.key == "Enter" && e.target.value) {
            if (registered) return;
            e.preventDefault();
            socket.emit("player-registration", e.target.value);
            localStorage.setItem("playerName", e.target.value);
            localStorage.setItem("playerScore", 0);
            setRegistered(true);
        }
    };

    const go = () => {
        socket.emit("go");
    };

    return (
        <div className="welcome">
            <h1>Please enter your Name:</h1>
            <input
                onKeyDown={keyCheck}
                type="text"
                name="username"
                defaultValue={"Player " + Math.floor(Math.random() * 10000)}
            />
            {registered && <button onClick={go}>Let&apos;s go!</button>}
        </div>
    );
}
