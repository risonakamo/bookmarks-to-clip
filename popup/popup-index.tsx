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
    var targetId:string|null=extractBookmarkId(inputBox.current!.value);

    if (!targetId)
    {
      setInputInvalid(true);
      return;
    }

    chrome.bookmarks.getSubTree(targetId,(result:BookmarkTreeNode[])=>{
      console.log(extractBookmarkUrls(result[0]));
    });
  }

  const invalidLinkClass={showing:inputInvalid};

  return <>
    <input type="text" className="link-input" ref={inputBox}/>
    <a href="" className="execute-button" onClick={executeButtonClick}>get links</a>
    <p className={cx("invalid-message",invalidLinkClass)}>invalid link</p>
  </>;
}

// attempt to extract bookmark id from a url or null if not a valid url
function extractBookmarkId(url:string):string|null
{
  // match[1]: the id
  var matched:RegExpMatchArray|null=url.match(/chrome:\/\/bookmarks\/\?id=(\d+)/);

  if (!matched || matched.length!=2)
  {
    return null;
  }

  return matched[1];
}

// given a bookmark node representing one folder, return all the urls of the bookmarks directly in
// that folder (non-recursive)
function extractBookmarkUrls(bookmarksNode:BookmarkTreeNode):string[]
{
  if (!bookmarksNode.children)
  {
    return [];
  }

  // filter out all folders
  var bookmarks:BookmarkTreeNode[]=bookmarksNode.children.filter((x:BookmarkTreeNode)=>{
    return !("children" in x);
  });

  return bookmarks.map((x:BookmarkTreeNode)=>{
    return x.url!;
  });
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}

window.onload=main;