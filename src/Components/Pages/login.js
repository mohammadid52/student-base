import React, { useState } from "react";
import Input from "../../Controls/Input";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const initialState = {
    email: "",
    password: "",
  };
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.login(user);
      history.push("/");
      setErrorMsg("");
      console.log("Logged in Successfully");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  return (
    <div className="container">
      <div className="py-5">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="card shadow">
              <div className="card-body">
                <img
                  src={require("../../Assets/logo.svg")}
                  className="card-img-top mb-5"
                  alt="Brand Logo"
                  height="70px"
                />
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Input
                      name="email"
                      placeholder="Enter Your Email"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p style={{ color: "#d00000", fontStyle: "italic" }}>
                    {errorMsg}
                  </p>
                  <button className="btn btn-primary btn-block">
                    Login to dashboard
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
