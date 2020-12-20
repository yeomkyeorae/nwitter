import React from "react";
import { authService, firebaseInstance } from "fBase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const onClickSocial = async event => {
    const {
      target: { name }
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      {" "}
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onClickSocial} name="google" className="authBtns">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onClickSocial} name="github" className="authBtns">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
