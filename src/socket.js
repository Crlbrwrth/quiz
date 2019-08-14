import * as io from "socket.io-client";
import { getQuestions, nextQuestion, startGame } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("start game", async players => {
            await store.dispatch(getQuestions());
            store.dispatch(startGame(players));
        });

        socket.on("next question", async players => {
            console.log("players in socket on next q: ", players);
            store.dispatch(nextQuestion());
        });

        // socket.on("player-registration", resp => {
        //     console.log("sth happening in socket.js", resp);
        // });
    }
};
