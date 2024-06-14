/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const SignInForm = ({ switchMode }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}student/login/`,
      formData
    );
    console.log(response);
  };

  return (
    <div className="form-container sign-in-container">
      <form className="forms" action="#" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="signin-heading">Sign in</h1>
        <div className="infield">
          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="Password"
            />
          </Form.Group>
        </div>
        {/* <div className="infield"></div> */}
        <button className="forms-btn">Sign In</button>
        <div className="form-lastfield">
          <a href="#" className="forgot">
            Forgot your password?
          </a>
          <p className="switch" onClick={switchMode}>
            Don't have an account? Sign up
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
