import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Welcome from "./welcome";
import Question from "./question";
import Endscreen from "./endscreen";

import { useSelector } from "react-redux";

export default function App() {
    let start = useSelector(state => state && state.start);
    let finished = useSelector(state => state && state.finished);
    // return (
    //     <BrowserRouter>
    //         <Route exact path="/" component={Welcome} />
    //         <Route path="/question" component={Question} />
    //         <Route path="/endscreen" component={Endscreen} />
    //     </BrowserRouter>
    // );
    if (!start) {
        return <Welcome />;
    } else if (start && !finished) {
        return <Question />;
    } else if (start && finished) {
        return <Endscreen />;
    }
}
