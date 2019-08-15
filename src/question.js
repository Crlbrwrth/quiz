import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, nextQuestion, setHighscore } from "./actions";
import { socket } from "./socket";

export default function Question() {
    // const [goToNext, setGoToNext] = useState(false);
    // const elemRef = useRef();
    // const elemRef2 = useRef();
    // const elemRef3 = useRef();
    // const elemRef4 = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("testyyyy");
        dispatch(getQuestions());
    }, []);

    let currQuestion = useSelector(
        state =>
            state.questions &&
            state.questions.filter(
                q =>
                    q ==
                    state.questions[localStorage.getItem("question_nr") - 1]
            )
    );

    console.log("currQuestion: ", currQuestion);

    let qAnswer = currQuestion.question;
    console.log("qA: ", qAnswer);

    // const questionNr = useSelector(state => state.question_nr);

    // useEffect(
    //     () => {
    // if (localStorage.getItem("question_nr") > 1) {
    //     elemRef.current.className = "q correct";
    //     elemRef2.current.className = "q wrong";
    //     elemRef3.current.className = "q wrong";
    //     elemRef4.current.className = "q wrong";
    // }
    //     },
    //     [questionNr]
    // );

    const answer = e => {
        let num;
        e.target.innerHTML == currQuestion[0].correct ? (num = 1) : (num = 0);
        // if (e.target.innerHTML == currQuestion[0].correct) {
        // localStorage.setItem(
        //     "playerScore",
        //     JSON.parse(localStorage.getItem("playerScore")) + 1
        // );
        // e.target.classList.add("correct");
        // }
        // else {
        //     e.target.classList.add("wrong");
        // }
        // setGoToNext(true);
        if (localStorage.getItem("question_nr") < 3) {
            socket.emit("answer", { num });
        } else {
            console.log("game over");
            socket.emit("answer", { num, over: true });
        }
    };

    // const nextQ = async () => {
    //     console.log("this is happening");
    //     document.getElementsByClassName("wrong")[0]
    //         ? document
    //             .getElementsByClassName("wrong")[0]
    //             .classList.remove("wrong")
    //         : document
    //             .getElementsByClassName("correct")[0]
    //             .classList.remove("correct");
    //
    //     if (localStorage.getItem("question_nr") < 3) {
    //         // setGoToNext(false);
    //         dispatch(nextQuestion());
    //     } else {
    //         dispatch(
    //             setHighscore(
    //                 localStorage.getItem("playerName"),
    //                 localStorage.getItem("playerScore")
    //             )
    //         );
    //         location.replace("/endscreen");
    //     }
    // };

    return (
        <div className="question">
            <h1>Welcome to the Questions Screen</h1>

            {currQuestion && currQuestion[0] && currQuestion.map()}

            {currQuestion && currQuestion[0] && (
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
                </div>
            )}
        </div>
    );
}
