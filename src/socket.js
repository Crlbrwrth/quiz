import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        // socket.on("player-registration", resp => {
        //     console.log("sth happening in socket.js", resp);
        // });
    }
};
