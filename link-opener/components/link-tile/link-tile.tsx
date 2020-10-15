import React from "react";

import "./link-tile.less";

export default function LinkTile():JSX.Element
{
  return <div className="link-tile selected">
    <img src="chrome://favicon/http://www.dlsite.com/maniax/circle/profile/=/maker_id/RG19442.html"/>
    <p>blue arrow garden サークルプロフィール | DLsite Maniax - 成人向け</p>
  </div>;
}