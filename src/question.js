import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "./actions";
import { socket } from "./socket";

export default function Question() {
    const dispatch = useDispatch();

    useEffect(() => {
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

    let qNr = useSelector(state => state.question_nr);

    if (qNr) {
        document
            .getElementsByClassName("correct")[0]
            .classList.remove("correct");
        if (document.getElementsByClassName("wrong")[0]) {
            document
                .getElementsByClassName("wrong")[0]
                .classList.remove("wrong");
        }
    }

    let qAnswer = currQuestion[0].question;
    let answersArr = [];
    answersArr.push(
        currQuestion[0].correct,
        currQuestion[0].wrong_1,
        currQuestion[0].wrong_2,
        currQuestion[0].wrong_3
    );
    let sortedArr = answersArr.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    const answer = e => {
        let num;
        if (e.target.innerHTML == currQuestion[0].correct) {
            e.target.classList.add("correct");
            num = 1;
        } else {
            e.target.classList.add("wrong");
            let i = JSON.parse(localStorage.getItem("question_nr") - 1);
            let quest = JSON.parse(localStorage.getItem("questions"));
            let qs = document.getElementsByClassName("q");
            for (let j = 0; j < qs.length; j++) {
                if (quest[i].correct == qs[j].innerHTML) {
                    qs[j].classList.add("correct");
                }
            }
            num = 0;
        }
        setTimeout(() => {
            if (localStorage.getItem("question_nr") < 3) {
                socket.emit("answer", { num });
            } else {
                socket.emit("answer", { num, over: true });
            }
        }, 1000);
    };

    return (
        <div className="questions">
            <h1>{qAnswer}</h1>
            {currQuestion &&
                currQuestion[0] &&
                sortedArr.map(q => (
                    <div
                        className="q"
                        onClick={answer}
                        key={sortedArr.indexOf(q)}
                    >
                        {q}
                    </div>
                ))}
        </div>
    );
}
