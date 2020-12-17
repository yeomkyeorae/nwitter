import React, { useState, useEffect } from "react";
import { dbService } from "fBase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection("nweets").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid
    });
    setNweet("");
  };

  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNweet(value);
  };

  const onChangeFile = event => {
    const {
      target: { files }
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachment = () => setAttachment();

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>cancel</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
