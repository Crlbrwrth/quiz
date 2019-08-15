import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHighscore } from "./actions";
import { socket } from "./socket";

export default function Endscreen() {
    const ranking = useSelector(state => state.ranking);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getHighscore());
    // }, []);

    // const highscoreList = useSelector(state => state.highscores);
    // const endScore = localStorage.getItem("playerScore");
    //
    // const restart = () => {
    //     location.replace("/");
    // };
    return (
        <div className="endscreen">
            <h1>Results</h1>
            <table>
                {ranking &&
                    ranking.map(r => (
                        <tbody className="result" key={ranking.indexOf(r)}>
                            <tr>
                                <th>{ranking.indexOf(r) + 1}. Place</th>
                                <td>{r.name}</td>
                                <td> {r.score} correct answers</td>
                            </tr>
                        </tbody>
                    ))}
            </table>
            <button
                onClick={() => {
                    socket.emit("restart");
                }}
            >
                Restart
            </button>
        </div>
    );
}

// return (
//     <div className="endscreen">
//         <h1>
//             {localStorage.getItem("playerName")}, you got {endScore}{" "}
//             questions right
//         </h1>
//         <hr />
//         <h2>All-time Highscore</h2>
//         <div className="highscore-list">
//             <table>
//                 {highscoreList &&
//                     highscoreList.map(s => (
//                         <tbody className="highscore-entry" key={s.id}>
//                             <tr>
//                                 <th>{s.name}</th>
//                                 <td>{s.score} correct answers</td>
//                             </tr>
//                         </tbody>
//                     ))}
//             </table>
//             <div>
//                 {highscoreList && (
//                     <button onClick={restart}>Restart The Quiz</button>
//                 )}
//             </div>
//         </div>
//     </div>
// );
