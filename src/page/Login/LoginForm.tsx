import React, { useContext, useState } from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { UserContext } from "../../App";
import { login } from "../../services/api/user";
import { getErrorMessage } from "../../services/api/error";
import { FormFeedback } from "reactstrap";

const LoginForm = () => {
  const { saveUserCredentials } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    let hasError = false;
    if (email === "") {
      hasError = true;
      setEmailError("Email không được để trống");
    }
    if (password === "") {
      hasError = true;
      setPassword("Mật khẩu không được để trống");
    }

    if (hasError) return;

    setLoggingIn(true);
    try {
      const loginResponse = await login({ email, password });
      saveUserCredentials(loginResponse.userData, loginResponse.token);
    } catch (error) {
      setLoggingIn(false);
      if (error.response) {
        const errorCode = error.response.data.error.message;
        const errorMessage = getErrorMessage(errorCode, "vi");
        if (errorCode === "INVALID_PASSWORD") {
          setPasswordError(errorMessage);
        } else if (errorCode === "NOT_REGISTERATION") {
          setEmailError(errorMessage);
        }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="form-group mb-3">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          invalid={emailError !== ""}
        />
        <FormFeedback>{emailError}</FormFeedback>
      </div>
      <FormGroup>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          invalid={passwordError !== ""}
        />
        <FormFeedback>{passwordError}</FormFeedback>
      </FormGroup>
      <div className="d-flex justify-content-between">
        <div className="custom-control custom-control-alternative d-flex align-items-center custom-checkbox">
          <input
            className="custom-control-input"
            id=" customCheckLogin55"
            type="checkbox"
          />
          <label className="custom-control-label" htmlFor=" customCheckLogin55">
            <span>Remember me</span>
          </label>
        </div>
        <div>
          <a
            className="text-first"
            href="#/"
            onClick={(e) => e.preventDefault()}
          >
            Recover password
          </a>
        </div>
      </div>
      <div className="text-center py-4">
        <Button
          color="second"
          className="font-weight-bold w-50 my-2"
          onClick={handleLogin}
          disabled={loggingIn}
        >
          {loggingIn ? (
            <span
              className="btn-wrapper--icon spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Sign in"
          )}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
