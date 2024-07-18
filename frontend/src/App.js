import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/login/Login";
import SignUp from "./Pages/sign-up/Sign-up";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "./context/User.context";
import { useState } from "react";
import Home from "./Pages/Home/Home";
import ToolBar from "./Components/Toolbar";
import AddProduct from "./Pages/Add-product/Add-Product";
import Cart from "./Pages/Cart/Cart";
import Order from "./Pages/Order/Order";
import EditProduct from "./Pages/Edit-product/Edit-product";

function App() {
  let user;
  if (
    localStorage.getItem("userData") != "" &&
    localStorage.getItem("userData") != null
  ) {
    user = JSON.parse(localStorage.getItem("userData"));
  } else {
    user = null;
  }

  const [userData, setUserData] = useState(user);
  let route;

  /* not loggedin */
  if (userData == null) {
    route = (
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    );
  } else {
    if (userData.admin) {
      route = (
        <Switch>
          <Route path="/home">
            <Home />
          </Route>

          <Route
            path="/product/:id"
            render={(props) => <EditProduct {...props} />}
          />
          <Route path="/create-product">{<AddProduct />}</Route>
        </Switch>
      );
      /* if user is admin */
    } else {
      route = (
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/order">
            <Order />
          </Route>
        </Switch>
      );
    }
  }
  return (
    <div>
      <Router>
        {" "}
        <UserContext.Provider value={{ userData, setUserData }}>
          <ToolBar />
          {route}
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
