import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fBase";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNewDisplayName(value);
  };

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
    }
    refreshUser();
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          style={{
            marginTop: 10
          }}
        />
      </form>
      <button onClick={onLogOutClick} className="formBtn cancelBtn logOut">
        logout
      </button>
    </div>
  );
};

export default Profile;
