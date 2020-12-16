import React from "react";

const Nweet = ({ nweetObj, isOwner }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
      <>
        <button>delete</button>
        <button>edit</button>
      </>
    )}
  </div>
);

export default Nweet;
