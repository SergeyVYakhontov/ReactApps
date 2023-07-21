import * as React from "react";
import * as ReactDom from "react-dom";
import { AppWrapper } from "../AppWrapper.tsx";

window.addEventListener("load", () => {
  ReactDom.hydrate(<AppWrapper />, document.getElementById("react_root"));
});
