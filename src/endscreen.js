import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHighscore } from "./actions";

export default function Endscreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHighscore());
    }, []);

    const highscoreList = useSelector(state => state.highscores);
    const endScore = localStorage.getItem("playerScore");

    const restart = () => {
        location.replace("/");
    };

    return (
        <div className="endscreen">
            <h1>
                {localStorage.getItem("playerName")}, you got {endScore}{" "}
                questions right
            </h1>
            <hr />
            <h2>All-time Highscore</h2>
            <div className="highscore-list">
                <table>
                    {highscoreList &&
                        highscoreList.map(s => (
                            <tbody className="highscore-entry" key={s.id}>
                                <tr>
                                    <th>{s.name}</th>
                                    <td>{s.score} correct answers</td>
                                </tr>
                            </tbody>
                        ))}
                </table>
                <div>
                    {highscoreList && (
                        <button onClick={restart}>Restart The Quiz</button>
                    )}
                </div>
            </div>
        </div>
    );
}
