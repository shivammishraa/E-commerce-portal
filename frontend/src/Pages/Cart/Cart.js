import { getCardUtilityClass } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import classes from "./Cart.module.css";
import * as fromCartService from "./Cart.service";
import * as fromUpdateCartService from "../../Components/Product-Card/service/Cart-service";
import CartItems from "./Casrt-items";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useHistory } from "react-router-dom";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Cart = () => {
  let history = useHistory();
  const [userCart, setUserCart] = useState([]);
  const [total_price, setTotalPrice] = useState(0);
  const [snackShowBar, setShowSnackBar] = useState(false);
  const [orderSnackBar, setorderSnackBar] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    getCart();
  }, []);
  const getCart = () => {
    const header = {
      Authorization: "Bearer " + userData.access_token,
    };
    fromCartService
      .getCart(header)
      .then((success) => {
       
        setUserCart(success.data.data.cart_items);
        let totalPrice = 0;
        for (let item of success.data.data.cart_items) {
          totalPrice = totalPrice + item.product.product_price * item.quantity;
        }
        setTotalPrice((prevousState) => {
          return totalPrice;
        });
      })
      .catch((err) => {});
  };
  const updateCart = (data) => {
    const header = {
      Authorization: "Bearer " + userData.access_token,
    };
    fromUpdateCartService
      .UpdateCart(data, header)
      .then((product) => {
        getCart();
        setShowSnackBar(true);
        setTimeout(() => {
          setShowSnackBar(true);
        }, 3000);
      })
      .catch((err) => {
      });
  };
  const placeOrder = () => {
    const header = {
      Authorization: "Bearer " + userData.access_token,
    };
    fromCartService
      .PlaceOrder(header)
      .then((success) => {
        /* order placed Sccessfull */
        setorderSnackBar(true);
        setTimeout(() => {
          setorderSnackBar(false);
        }, 3000);
        history.push("/order");
      })
      .catch((err) => {
      });
  };
  return (
    <div>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <a href="#!" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Continue shopping
                        </a>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {userCart.length} items in your cart
                          </p>
                        </div>
                        <div></div>
                      </div>
                      {userCart.map((item) => {
                        return (
                          <CartItems
                            cart={item}
                            user={userData}
                            updateCart={updateCart}
                          ></CartItems>
                        );
                      })}
                    </div>
                    <div className="col-lg-5">
                      <div className="card bg-primary text-white rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${total_price}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">00.00</p>
                          </div>

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">${total_price}</p>
                          </div>

                          <button
                            type="button"
                            className="btn btn-info btn-block btn-lg"
                          >
                            <div className="d-flex justify-content-between">
                              <span>${total_price}</span>
                              <span onClick={placeOrder}>
                                Place Order
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar open={snackShowBar} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Cart Updated
        </Alert>
      </Snackbar>
      <Snackbar open={orderSnackBar} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Order Placed Successfully
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Cart;
