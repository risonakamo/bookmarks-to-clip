import React from "react";
import ReactDOM from "react-dom";

import "./popup-index.less";

function PopupMain():JSX.Element
{
  return <>
    hello
  </>;
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}

window.onload=main;