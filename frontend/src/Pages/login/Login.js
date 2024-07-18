import { useState, useContext, useEffect } from "react";
import * as fromLoginService from "./service/login.service";
import classes from "./login.module.css";
import { useHistory } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { UserContext } from "../../context/User.context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = () => {
  let history = useHistory();

  const { userData, setUserData } = useContext(UserContext);

  const [fromValues, setFormValues] = useState({
    email: "",
    password: "",
    invalid: true,
    errorMessage: "",
  });

  const [snackShowBar, setShowSnackBar] = useState(false);
  const enterEmailHandler = (event) => {
    const email = event.target.value;
    setFormValues((state) => {
      return { ...state, email: email, errorMessage: "" };
    });
    if (validateEmail(email) && fromValues.password !== "") {
      setFormValues((state) => {
        return { ...state, invalid: false };
      });
    }
  };
  const validateEmail = (email) => {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };
  const enterPassword = (event) => {
    const password = event.target.value;
    setFormValues((state) => {
      return { ...state, password: password, errorMessage: "" };
    });
    if (validateEmail(fromValues.email) && fromValues.password !== "") {
      setFormValues((state) => {
        return { ...state, invalid: false };
      });
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = { email: fromValues.email, password: fromValues.password };
    fromLoginService
      .Login(data)
      .then((success) => {
        localStorage.setItem("userData", JSON.stringify(success.data.data));
        setUserData(success.data.data);
        history.push("/home");
        setShowSnackBar(true);
        setTimeout(() => {
          setShowSnackBar(false);
        }, 3000);
      })
      .catch((err) => {
        setFormValues((state) => {
          return {
            ...state,
            errorMessage: err.response?.data?.message
              ? err.response?.data?.message
              : "Try again",
          };
        });
      });
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row col-12 col-md-6 h-auto">
        {fromValues.errorMessage !== "" ? (
          <div className="alert alert-danger" role="alert">
            {fromValues.errorMessage}
          </div>
        ) : (
          ""
        )}
        <div className="card">
          <form className="container mb-3" onSubmit={onSubmitHandler}>
            <h2 className="text-center mt-2">Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                required
                value={fromValues.email}
                onChange={enterEmailHandler}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={fromValues.password}
                onChange={enterPassword}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={fromValues.invalid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Snackbar open={snackShowBar} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Login Success
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Login;
