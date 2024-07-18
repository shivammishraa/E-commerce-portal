import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/User.context";
import { Link } from "react-router-dom";
const ToolBar = () => {
  const { userData, setUserData } = useContext(UserContext);
  let history = useHistory();
  let nav = [];
  if (userData == null) {
    nav = [
      { label: "Login", Link: "/login" },
      { label: "Register", Link: "/sign-up" },
    ];
  } else {
    if (userData.admin) {
      nav = [
        { label: "Home", Link: "/home" },

       
        { label: "Create Product", Link: "/create-product" },
        { label: "Logout", Link: "/logout" },
      ];
    } else {
      nav = [
        { label: "Home", Link: "/home" },
        { label: "Cart", Link: "/cart" },
        { label: "Orders", Link: "/order" },
        { label: "Logout", Link: "/logout" },
      ];
    }
  }
  const onLogout = () => {
    localStorage.setItem("userData", null);
    setUserData(null);
    history.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Lets Shop
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {nav.map((item, index) =>
            item.label !== "Logout" ? (
              <li className="nav-item" key={index}>
                <Link className="nav-link" to={item.Link}>
                  {item.label}
                </Link>
              </li>
            ) : (
              <li className="nav-item" key={index}>
                <Link className="nav-link" onClick={onLogout} to={"/login"}>
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};
export default ToolBar;
