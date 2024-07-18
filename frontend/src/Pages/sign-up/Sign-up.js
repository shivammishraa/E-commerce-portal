import { useState, useContext } from "react";
import * as fromSignUpService from "./service/sign-up.service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { UserContext } from "../../context/User.context";
import { useHistory } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SignUp = () => {
  const { userData, setUserData } = useContext(UserContext);
const history=useHistory()
  const [snackShowBar, setShowSnackBar] = useState(false);
  const [fromValues, setFormValues] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    invalid: true,
    errorMessage: "",
  });

  const enterNameHandler = (event) => {
    const name = event.target.value;
    setFormValues((state) => {
      return { ...state, name: name, errorMessage: "" };
    });
    validateFrom();
  };
  const enterNumberHandler = (event) => {
    const phone_number = event.target.value;
    setFormValues((state) => {
      return { ...state, phone_number: phone_number, errorMessage: "" };
    });
    validateFrom();
  };
  const enterEmailHandler = (event) => {
    const email = event.target.value;
    setFormValues((state) => {
      return { ...state, email: email, errorMessage: "" };
    });
    validateFrom();
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
    validateFrom();
  };
  const validateFrom = () => {
    if (
      validateEmail(fromValues.email) &&
      fromValues.password !== "" &&
      fromValues.phone_number !== "" &&
      fromValues.name !== ""
    ) {
      setFormValues((state) => {
        return { ...state, invalid: false };
      });
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: fromValues.email,
      password: fromValues.password,
      name: fromValues.name,
      phone_number: fromValues.phone_number,
    };
    fromSignUpService
      .SignUp(data)
      .then((success) => {
      
        setShowSnackBar(true);
        setTimeout(() => {
          setShowSnackBar(false);
        }, 3000);
      })
      history.push('/login')
      .catch((err) => {
        setFormValues((state) => {
          return { ...state, errorMessage: err.response.data.message };
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
            <h2 className="text-center mt-2">Register</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="name"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                required
                value={fromValues.name}
                onChange={enterNameHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label">
                Contact Number
              </label>
              <input
                type="phone_number"
                className="form-control"
                id="phone_number"
                aria-describedby="phone_numberHelp"
                required
                value={fromValues.phone_number}
                onChange={enterNumberHandler}
              />
            </div>
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
          User Registered
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SignUp;
