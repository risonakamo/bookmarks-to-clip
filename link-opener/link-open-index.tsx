import React,{useState,useRef} from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import _ from "lodash";

import LinkTile from "./components/link-tile/link-tile";

import "./link-open-index.less";

interface BookmarkTileInfo
{
  link:string
  selected:boolean
  inactive:boolean
}

function LinkOpenMain():JSX.Element
{
  // the currently loaded links
  const [theCurrentLinks,settheCurrentLinks]=useState<BookmarkTileInfo[]>([]);

  // if in tile view or not.
  const [tileMode,setTileMode]=useState<boolean>(false);

  const theLinkInputBox=useRef<HTMLTextAreaElement>(null);

  // set the current links. also shuffles them.
  function loadLinks(links:string[]):void
  {
    settheCurrentLinks(_.shuffle(_.map(links,(x:string)=>{
      return {
        link:x,
        selected:false,
        inactive:false
      };
    })));
  }

  // link tile on click, toggle selected state
  function toggleSelectLinkTile(index:number):void
  {
    var modifiedLinks:BookmarkTileInfo[]=[...theCurrentLinks];
    modifiedLinks[index]={
      ...modifiedLinks[index],
      selected:!modifiedLinks[index].selected
    };

    settheCurrentLinks(modifiedLinks);
  }

  // shuffle the links
  function shuffleLinks():void
  {
    settheCurrentLinks(_.shuffle(theCurrentLinks));
  }

  // open all selected links, deselect and mark them as inactive.
  function openLinks():void
  {
    var selectedUrls:string[]=[];
    settheCurrentLinks(_.map(theCurrentLinks,(x:BookmarkTileInfo)=>{
      if (x.selected)
      {
        selectedUrls.push(x.link);
        return {
          ...x,
          selected:false,
          inactive:true
        };
      }

      return x;
    }));

    openAllTabs(selectedUrls);
  }

  // attempt to load the input and switch to tiles view with the input
  function loadInput():void
  {
    var inputedLinks:string[]=_.filter(_.map(theLinkInputBox.current!.value.split("\n"),(x:string)=>{
      return x.trim();
    }),(x:string)=>{
      return x.length;
    }) as string[];

    loadLinks(inputedLinks);
    setTileMode(true);
  }

  var selectedCount:number=0;
  const generatedLinkTiles:JSX.Element[]=_.map(theCurrentLinks,(x:BookmarkTileInfo,i:number)=>{
    if (x.selected)
    {
      selectedCount++;
    }

    return <LinkTile link={x.link} key={i} index={i} onClick={toggleSelectLinkTile}
      selected={x.selected} inactive={x.inactive}/>;
  });

  const contentAreaClass={
    "tile-mode":tileMode
  };

  return <>
    <div className="tool-bar">
      <span className="selected-count">{selectedCount} selected</span>
      <button onClick={openLinks}>open selected links</button>
      <button onClick={shuffleLinks}>shuffle</button>
    </div>
    <div className={cx("content-area",contentAreaClass)}>
      <div className="links-input-zone">
        <textarea className="link-input" ref={theLinkInputBox}></textarea>
        <button onClick={loadInput}>submit</button>
      </div>
      <div className="link-tiles">
        {generatedLinkTiles}
      </div>
    </div>
  </>;
}

// open list of urls in new background tabs
function openAllTabs(urls:string[]):void
{
  for (var x=0;x<urls.length;x++)
  {
    chrome.tabs.create({url:urls[x],active:false});
  }
}

function main()
{
  ReactDOM.render(<LinkOpenMain/>,document.querySelector(".main"));
}

window.onload=main;