import * as io from "socket.io-client";
import { getQuestions, nextQuestion, startGame, endGame } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("start game", async players => {
            await store.dispatch(getQuestions());
            store.dispatch(startGame(players));
        });

        socket.on("next question", async players => {
            store.dispatch(nextQuestion());
        });

        socket.on("end game", async players => {
            store.dispatch(endGame(players));
        });

        // socket.on("player-registration", resp => {
        //     console.log("sth happening in socket.js", resp);
        // });
    }
};
