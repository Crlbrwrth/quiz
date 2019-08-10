import React from "react";

export default function Welcome() {
    const keyCheck = e => {
        if (e.key == "Enter" && e.target.value) {
            e.preventDefault();
            localStorage.setItem("myValueInLocalStorage", e.target.value);
            // socket.emit("chatMessage", e.target.value);
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
