import React,{useEffect,useState} from "react";
import cx from "classnames";

import "./link-tile.less";

interface LinkTileProps
{
  link:string //link this box will display
  index:number //index number to help with parent reference
  selected?:boolean //style this box as selected
  onClick?:(index:number)=>void //tile click, returns the index number of this box
}

export default function LinkTile(props:LinkTileProps):JSX.Element
{
  const [name,setName]=useState<string>("");

  // acquire name from bookmark search when link changes if possible
  useEffect(()=>{
    chrome.bookmarks.search({url:props.link},(result:BookmarkTreeNode[])=>{
      if (!result.length)
      {
        setName(props.link);
        return;
      }

      setName(result[0].title);
    });
  },[props.link]);

  // call on clikc, provide the index
  function tileClick():void
  {
    if (props.onClick)
    {
      props.onClick(props.index);
    }
  }

  const iconLink:string=`chrome://favicon/${props.link}`;
  const tileClass={
    selected:props.selected
  };

  return <div className={cx("link-tile",tileClass)} onClick={tileClick}>
    <img src={iconLink}/>
    <p>{name}</p>
  </div>;
}