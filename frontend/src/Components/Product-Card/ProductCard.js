import classes from "./ProductCard.module.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useState } from "react";
import axois from "axios";
import * as fromCartService from "./service/Cart-service";
import { useHistory } from "react-router-dom";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ProductCard = (props) => {
  const history = useHistory();
  const [snackShowBar, setShowSnackBar] = useState(false);
  const [snackShowBarError, setSnackShowBarError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const onAddToCart = (productId) => {
    const header = {
      Authorization: "Bearer " + props.user.access_token,
    };
    const data = {
      product: productId,
      quantity: 1,
    };
    fromCartService
      .UpdateCart(data, header)
      .then((response) => {
        setShowSnackBar(true);
        setTimeout(() => {
          setShowSnackBar(false);
        }, 3000);
      })
      .catch((err) => {
        setSnackShowBarError(true);
        setErrorMessage(
          err.response.data.message
            ? err.response.data.message
            : "Please Try Again"
        );
        setTimeout(() => {
          setSnackShowBarError(false);
        }, 3000);
      });
  };
  const deleteProduct = (product_Id) => {
    props.onDeleteProduct(product_Id);
  };
  const editProduct = (productId) => {
    history.push(`/product/${productId}`);
  };
  return (
    <div className={`m-2 card ${props.className}`}>
      <div className="card-body">
        <section>
          <img
            className={classes["image-section"]}
            src={props.product.product_image}
          />
        </section>
        <section className="d-flex flex-column justify-content-center align-items-center">
          <h2 className={classes["h2"]}>{props.product.product_name}</h2>
          <h3 className={classes["h3"]}>{props.product.product_details}</h3>
          <h3 className={`${classes["h3"]} text-center`}>
            Price : {props.product.product_price}
          </h3>
        </section>
        <section className="d-flex justify-content-evenly align-items-center">
          {props.user.admin ? (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  editProduct(props.product._id);
                }}
              >
                Edit
              </button>
              {/* {<button
                className="btn btn-danger"
                onClick={() => {
                  deleteProduct(props.product._id);
                }}
              >
                Delete
              </button>} */}
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                onAddToCart(props.product._id);
              }}
            >
              Add To Cart
            </button>
          )}
          {/* <button
            className="btn btn-primary"
            onClick={() => {
              onAddToCart(props.product._id);
            }}
          >
            Add To Cart
          </button> */}
        </section>
      </div>
      <Snackbar open={snackShowBar} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Product Added To Cart
        </Alert>
      </Snackbar>
      <Snackbar open={snackShowBarError} autoHideDuration={3000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {ErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ProductCard;
