import React, { useRef, useState } from "react";
import "./Login.css"
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

function Login() {
  const [error, setError] = useState(null);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { setToken } = useContext(AuthContext);

  const url = "https://staging-api.expertplans.co.uk/admins/login";

  async function loginCredentials(email, password) {
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      if (!response.status === 200) {
        const errorData = response;
        throw new Error(errorData.description);
      }
      const responseData = response;
      setToken(responseData.data.token);
      setError(null);
      return responseData;
    } catch (error) {
      const errorData = error;
      setToken(null);
      setError(errorData.response.data.message);
      throw errorData;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    loginCredentials(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Expert Plans Skill Test</h1>
      <label htmlFor="email">
        Email:
        <input type="text" id="email" ref={emailInputRef} />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input type="password" id="password" ref={passwordInputRef} />
      </label>
      <br />
      <button type="submit">Log in</button>
      {error && <p className="login-form__error">{error}</p>}
    </form>
  );
}

export default Login;
