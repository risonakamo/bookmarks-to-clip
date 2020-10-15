import React from "react";
import ReactDOM from "react-dom";

import LinkTile from "./components/link-tile/link-tile";

import "./link-open-index.less";

function LinkOpenMain():JSX.Element
{
  return <>
    <LinkTile/>
    <LinkTile/>
  </>;
}

function main()
{
  ReactDOM.render(<LinkOpenMain/>,document.querySelector(".main"));
}

window.onload=main;