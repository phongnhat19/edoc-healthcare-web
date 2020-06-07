import React, { useContext, useState } from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { UserContext } from "../../App";

const LoginForm = () => {
  const { saveUserCredentials } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const userData: User = {
      email: email,
      name: "Admin",
      avatar:
        "https://res.cloudinary.com/gophuot/image/upload/c_scale,w_70/v1582566632/vu9otmrwzilrqlhqzjnr.jpg",
      role: "Super admin",
    };
    saveUserCredentials(userData, "123");
  };

  return (
    <div>
      <div className="form-group mb-3">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <FormGroup>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
        >
          Sign in
        </Button>
      </div>
      <div className="text-center text-black-50 mt-3">
        Don't have an account?{" "}
        <a className="text-first" href="#/" onClick={(e) => e.preventDefault()}>
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
