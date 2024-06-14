import { useState } from "react";
import "./style.css"; // Import your CSS file
// import img1 from "../../assets/img/aaa.svg";
// import img2 from "../../assets/img/bbb.svg";
// import SignInForm from "../../components/Form/SignInForm";
// import SignUpForm from "../../components/Form/SignUpForm";
import signinimg from "../../assets/img/aaa.svg"
import signupimg from "../../assets/img/bbb.svg"

import ReactDom from "react-dom";
import SignInForm from "../../components/Form/SignInForm";
import SignUpForm from "../../components/Form/SignUpForm";

const AuthForm = ({ setIsOpen }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  //  const [isOpen, setIsOpen] = useState(true);

  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  const closeForm = () => {
    setIsOpen();
  };
  return ReactDom.createPortal(
    <div className="Authcontainer">
      <div
        className={`   auth-container ${isSignUp ? "sign-up-mode" : ""}`}
        id="container"
      >
        <button className="close-button" onClick={closeForm}>
          &times;
        </button>

        <SignInForm switchMode={switchMode} />
        <SignUpForm setcancel={closeForm} switchMode={switchMode} />
        <div className="overlay-container" id="overlayCon">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <img src={signinimg} alt="signin" />
            </div>
            <div className="overlay-panel overlay-left">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <img src={signupimg} alt="signin" />
            </div>
          </div>
          <button id="overlayBtn" />
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default AuthForm;
