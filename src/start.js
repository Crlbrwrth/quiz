import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

init(store);
let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elem, document.querySelector("main"));
