import React from "react";
import ReactDOM from "react-dom";

import smoothscroll from "smoothscroll-polyfill";

import "./index.scss";
import App from "./App";

// Element.scrollIntoView polyfill for Safari
smoothscroll.polyfill();

ReactDOM.render(<App />, document.getElementById("root"));
