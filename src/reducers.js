export default function(state = {}, action) {
    if (action.type == "GET_QUESTIONS") {
        state = {
            ...state,
            questions: action.questions
        };
    }
    if (action.type == "NEXT_QUESTION") {
        state = {
            ...state,
            question_nr: action.question_nr
        };
    }
    if (action.type == "GET_HIGHSCORE") {
        state = {
            ...state,
            highscores: action.data
        };
    }
    if (action.type == "START_GAME") {
        state = {
            ...state,
            players: action.players,
            questions: action.questions,
            start: true
        };
    }
    if (action.type == "END_GAME") {
        console.log("players in reducers.js: ", action.players);
        let sortedPs = action.players.sort((a, b) =>
            a.score > b.score ? -1 : b.score > a.score ? 1 : 0
        );
        let reduced = sortedPs.map(ele => {
            let newObj = {};
            newObj.name = ele.name;
            newObj.score = ele.score;
            return newObj;
        });
        state = {
            ...state,
            ranking: reduced,
            finished: true
        };
    }

    return state;
}
