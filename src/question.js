import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, nextQuestion } from "./actions";
import axios from "axios";

export default function Question() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestions());
    }, []);

    const currentQuestion = useSelector(
        state =>
            state.questions &&
            state.questions.filter(
                q => q == state.questions[localStorage.getItem("question_nr")]
            )
    );

    console.log("currentQuestion looool: ", currentQuestion);

    const next = () => {
        dispatch(nextQuestion());
    };

    return (
        <div className="question">
            <h1>Welcome to the Questions Screen</h1>
            <button onClick={next}>Answer</button>
            {currentQuestion && (
                <div>
                    <h2>{currentQuestion[0].question}</h2>
                    <div onClick={next}>{currentQuestion[0].correct}</div>
                    <div onClick={next}>{currentQuestion[0].wrong_1}</div>
                    <div onClick={next}>{currentQuestion[0].wrong_2}</div>
                    <div onClick={next}>{currentQuestion[0].wrong_3}</div>
                </div>
            )}
        </div>
    );
}
