import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Welcome from "./welcome";
import Question from "./question";
import Endscreen from "./endscreen";

export default function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Welcome} />
            <Route path="/question" component={Question} />
            <Route path="/endscreen" component={Endscreen} />
        </BrowserRouter>
    );
}
