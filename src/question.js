import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, nextQuestion, setHighscore } from "./actions";
import { socket } from "./socket";

export default function Question() {
    const [goToNext, setGoToNext] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestions());
    }, []);

    const currQuestion = useSelector(
        state =>
            state.questions &&
            state.questions.filter(
                q => q == state.questions[localStorage.getItem("question_nr")]
            )
    );

    const answer = e => {
        if (goToNext) return;
        let num;
        e.target.innerHTML == currQuestion[0].correct ? (num = 1) : (num = 0);
        socket.emit("answer", { num });

        if (e.target.innerHTML == currQuestion[0].correct) {
            localStorage.setItem(
                "playerScore",
                JSON.parse(localStorage.getItem("playerScore")) + 1
            );
            e.target.classList.add("correct");
        } else {
            e.target.classList.add("wrong");
        }
        setGoToNext(true);
    };

    const nextQ = async () => {
        document.getElementsByClassName("wrong")[0]
            ? document
                .getElementsByClassName("wrong")[0]
                .classList.remove("wrong")
            : document
                .getElementsByClassName("correct")[0]
                .classList.remove("correct");

        if (localStorage.getItem("question_nr") < 2) {
            setGoToNext(false);
            dispatch(nextQuestion());
        } else {
            dispatch(
                setHighscore(
                    localStorage.getItem("playerName"),
                    localStorage.getItem("playerScore")
                )
            );
            location.replace("/endscreen");
        }
    };

    return (
        <div className="question">
            <h1>Welcome to the Questions Screen</h1>
            {currQuestion && (
                <div className="question-container">
                    <h2>{currQuestion[0].question}</h2>
                    <div className="answers-container">
                        <div className="q" onClick={answer}>
                            {currQuestion[0].correct}
                        </div>
                        <div className="q" onClick={answer}>
                            {currQuestion[0].wrong_1}
                        </div>
                        <div className="q" onClick={answer}>
                            {currQuestion[0].wrong_2}
                        </div>
                        <div className="q" onClick={answer}>
                            {currQuestion[0].wrong_3}
                        </div>
                    </div>
                    {goToNext && (
                        <button className="next-q" onClick={nextQ}>
                            Next Question
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
