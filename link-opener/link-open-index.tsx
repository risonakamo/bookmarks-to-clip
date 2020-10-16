import React,{useState} from "react";
import ReactDOM from "react-dom";

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
  "https://chan.sankakucomplex.com/?tags=nekololisama",
  "https://chan.sankakucomplex.com/?tags=hiropon_%28hiroto21111%29",
  "https://chan.sankakucomplex.com/?tags=stmaster",
];

function LinkOpenMain():JSX.Element
{
  // the currently loaded links
  const [theCurrentLinks,settheCurrentLinks]=useState<string[]>(_tempSampleLinks);

  // create link tiles from current links state
  function generateLinkTiles():JSX.Element[]
  {
    return theCurrentLinks.map((x:string,i:number)=>{
      return <LinkTile link={x} key={i}/>;
    });
  }

  return <>
    <div className="tool-bar">

    </div>
    <div className="link-tiles">
      {generateLinkTiles()}
    </div>
  </>;
}

function main()
{
  ReactDOM.render(<LinkOpenMain/>,document.querySelector(".main"));
}

window.onload=main;