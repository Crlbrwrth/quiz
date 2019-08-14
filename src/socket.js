import * as io from "socket.io-client";
import { startGame, getQuestions } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("start game", async players => {
            await store.dispatch(getQuestions());
            store.dispatch(startGame(players));
        });

        // socket.on("player-registration", resp => {
        //     console.log("sth happening in socket.js", resp);
        // });
    }
};
