import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, nextQuestion } from "./actions";
import axios from "axios";

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

    const answer = () => {
        setGoToNext(true);
    };

    const nextQ = () => {
        localStorage.getItem("question_nr") < 2
            ? dispatch(nextQuestion())
            : location.replace("/endscreen");
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
