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

    return state;
}
