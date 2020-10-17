import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import LinkTile from "./components/link-tile/link-tile";

import "./link-open-index.less";

const _tempSampleLinks:string[]=[
  "https://chan.sankakucomplex.com/?tags=beanis",
  "https://nhentai.net/artist/butcha-u/",
  "https://www.pixiv.net/member.php?id=1319954",
  "https://nhentai.net/g/265608/",
  "https://hitomi.la/group/system%204-5-1-all-1.html",
  "https://www.pixiv.net/member.php?id=7075132",
  "https://chan.sankakucomplex.com/?tags=013_%28hamsasuke%29",
  "https://chan.sankakucomplex.com/?tags=mushi024",
  "https://nhentai.net/artist/miyamoto-issa/?page=2",
  "https://www.pixiv.net/member.php?id=2677",
  "https://chan.sankakucomplex.com/?tags=moccoss",
  "https://chan.sankakucomplex.com/?tags=sereneandsilent",
  "https://nhentai.net/group/tiusan-kingdom/?page=1",
  "https://nhentai.net/artist/kurowa/?page=1",
  "https://nhentai.net/artist/harigane-shinshi/",
  "https://nhentai.net/artist/waero/",
  "https://chan.sankakucomplex.com/?tags=obiwan",
  "https://chan.sankakucomplex.com/?tags=thor_%28deep_rising%29",
  "https://hitomi.la/artist/thor-all-1.html",
  "https://nhentai.net/artist/waterring/",
  "https://chan.sankakucomplex.com/?tags=shadman",
  "https://chan.sankakucomplex.com/?tags=val_%28escc4347%29",
  "https://chan.sankakucomplex.com/?tags=ata_%28tsumari%29",
  "https://chan.sankakucomplex.com/?tags=ata_%28tsumari%29",
  "https://chan.sankakucomplex.com/?tags=nekololisama",
  "https://chan.sankakucomplex.com/?tags=hiropon_%28hiroto21111%29",
  "https://chan.sankakucomplex.com/?tags=stmaster",
  "https://go"
];

interface BookmarkTileInfo
{
  link:string
  selected:boolean
}

function LinkOpenMain():JSX.Element
{
  // the currently loaded links
  const [theCurrentLinks,settheCurrentLinks]=useState<BookmarkTileInfo[]>([]);

  // loading sample links
  useEffect(()=>{
    loadLinks(_tempSampleLinks);
  },[]);

  // set the current links. also shuffles them.
  function loadLinks(links:string[]):void
  {
    settheCurrentLinks(_.shuffle(_.map(links,(x:string)=>{
      return {
        link:x,
        selected:false
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

  var selectedCount:number=0;
  const generatedLinkTiles:JSX.Element[]=_.map(theCurrentLinks,(x:BookmarkTileInfo,i:number)=>{
    if (x.selected)
    {
      selectedCount++;
    }

    return <LinkTile link={x.link} key={i} index={i} onClick={toggleSelectLinkTile} selected={x.selected}/>;
  });

  return <>
    <div className="tool-bar">
      <span className="selected-count">{selectedCount} selected</span>
      <button>open selected links</button>
      <button onClick={shuffleLinks}>shuffle</button>
    </div>
    <div className="link-tiles">
      {generatedLinkTiles}
    </div>
  </>;
}

function main()
{
  ReactDOM.render(<LinkOpenMain/>,document.querySelector(".main"));
}

window.onload=main;