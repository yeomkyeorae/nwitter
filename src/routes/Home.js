import React, { useState, useEffect } from "react";
import { dbService } from "fBase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach(document => {
      const nweetObj = {
        ...document.data(),
        id: document.id
      };
      setNweets(prev => [nweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      nweet,
      createAt: Date.now()
    });
    setNweet("");
  };
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNweet(value);
  };

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
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
