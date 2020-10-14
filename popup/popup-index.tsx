import React,{useRef,useState} from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import "./popup-index.less";

function PopupMain():JSX.Element
{
  //if the input was invalid
  const [inputInvalid,setInputInvalid]=useState<boolean>(false);

  const inputBox=useRef<HTMLInputElement>(null);

  // handle clicking get links button
  function executeButtonClick(e:React.MouseEvent):void
  {
    e.preventDefault();
    var targetId:number|null=extractBookmarkId(inputBox.current!.value);

    if (!targetId)
    {
      setInputInvalid(true);
      return;
    }
  }

  const invalidLinkClass={showing:inputInvalid};

  return <>
    <input type="text" className="link-input" ref={inputBox}/>
    <a href="" className="execute-button" onClick={executeButtonClick}>get links</a>
    <p className={cx("invalid-message",invalidLinkClass)}>invalid link</p>
  </>;
}

// attempt to extract bookmark id from a url or null if not a valid url
function extractBookmarkId(url:string):number|null
{
  // match[1]: the id
  var matched:RegExpMatchArray|null=url.match(/chrome:\/\/bookmarks\/\?id=(\d+)/);

  if (!matched || matched.length!=2)
  {
    return null;
  }

  return parseInt(matched[1]);
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}

window.onload=main;