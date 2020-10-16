import React,{useEffect,useState} from "react";

import "./link-tile.less";

interface LinkTileProps
{
  link:string
  // index:number
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

  const iconLink:string=`chrome://favicon/${props.link}`;

  return <div className="link-tile">
    <img src={iconLink}/>
    <p>{name}</p>
  </div>;
}