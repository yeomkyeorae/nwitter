import React from "react";
import { authService, firebaseInstance } from "fBase";
import AuthForm from "components/AuthForm";

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
    <div>
      <AuthForm />
      <button onClick={onClickSocial} name="google">
        Continue with Google
      </button>
      <button onClick={onClickSocial} name="github">
        Continue with Github
      </button>
    </div>
  );
};
export default Auth;
