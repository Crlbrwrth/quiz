import React from "react";
import { socket } from "./socket";

export default function Welcome() {
    localStorage.setItem("question_nr", 0);

    const keyCheck = e => {
        socket.emit("player-registration", e.target.value);
        if (e.key == "Enter" && e.target.value) {
            e.preventDefault();
            localStorage.setItem("playerName", e.target.value);
            localStorage.setItem("playerScore", 0);
            location.replace("/question");
        }
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
        </div>
    );
}
