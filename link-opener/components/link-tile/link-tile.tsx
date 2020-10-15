import React from "react";

import "./link-tile.less";

interface LinkTileProps
{
  link:string
}

export default function LinkTile(props:LinkTileProps):JSX.Element
{
  const iconLink:string=`chrome://favicon/${props.link}`;

  return <div className="link-tile">
    <img src={iconLink}/>
    <p>{props.link}</p>
  </div>;
}