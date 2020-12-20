import React, { useState } from "react";
import { dbService, storageService } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [editNweet, setEditNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.ref(nweetObj.attachmentURL).delete();
    }
  };

  const toggleEditing = () => setEditing(prev => !prev);

  const onSubmit = async event => {
    event.preventDefault();

    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: editNweet
    });
    setEditing(false);
  };

  const onChange = event => {
    const {
      target: { value }
    } = event;
    setEditNweet(value);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={editNweet}
              onChange={onChange}
              required
              className="formInput"
            />
            <input type="submit" value="update nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentURL && (
            <img src={nweetObj.attachmentURL} width="50px" height="50px" />
          )}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
