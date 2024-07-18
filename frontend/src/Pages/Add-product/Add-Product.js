import { useState, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import storage from "../../firebase/firebase";
import classes from "./Add-product.module.css";
import { UserContext } from "../../context/User.context";
import * as fromProductService from "./service/AddProduct- service";
import { useHistory } from "react-router-dom";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const AddProduct = () => {
  let history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [snackShowBar, setShowSnackBar] = useState(false);
  const [snackShowBarError, setSnackShowBarError] = useState(false);
  const [fromValues, setFormValues] = useState({
    product_name: "",
    product_price: "",
    product_image: "",
    product_details: "",
    invalid: true,
    errorMessage: "",
  });
  const enterProductName = (event) => {
    const product_name = event.target.value;
    setFormValues((state) => {
      return { ...state, product_name: product_name, errorMessage: "" };
    });
    validateFrom();
  };
  const enterProductDetails = (event) => {
    const product_details = event.target.value;
    setFormValues((state) => {
      return { ...state, product_details: product_details, errorMessage: "" };
    });
    validateFrom();
  };
  const enterProductPrice = (event) => {
    const product_price = event.target.value;
    setFormValues((state) => {
      return { ...state, product_price: product_price, errorMessage: "" };
    });
    validateFrom();
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    /*  const header= */
    const header = {
      Authorization: "Bearer " + userData.access_token,
    };
    const data = {
      product_details: fromValues.product_details,
      product_image: fromValues.product_image,
      product_name: fromValues.product_name,
      product_price: fromValues.product_price,
    };
    fromProductService
      .AddProduct(data, header)
      .then((success) => {
        setFormValues({
          product_details: "",
          product_image: "",
          product_name: "",
          product_price: "",
          invalid: true,
          errorMessage: "",
        });
        setShowSnackBar(true);
        setTimeout(() => {
          setShowSnackBar(false);
        }, 3000);
        history.push("/home");
      })
      .catch((err) => {
       
        setSnackShowBarError(true);
        setTimeout(() => {
          setSnackShowBarError(false);
        }, 3000);
      });
  };
  const validateFrom = () => {
    if (
      fromValues.product_details !== "" &&
      fromValues.product_image !== "" &&
      fromValues.product_name !== "" &&
      fromValues.product_price !== ""
    ) {
      setFormValues((state) => {
        return { ...state, invalid: false };
      });
    } else {
      setFormValues((state) => {
        return { ...state, invalid: true };
      });
    }
  };
  const uploadProductImage = (file) => {
    const upload = storage
      .ref(`/images/${file.name}`)
      .put(file)
      .then((res) => {
        storage
          .ref(`/images/${file.name}`)
          .getDownloadURL()
          .then((ImageUrl) => {
            setFormValues((state) => {
              return { ...state, product_image: ImageUrl };
            });
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
          <form className="container card-body mb-3" onSubmit={onSubmitHandler}>
            <h2 className="text-center mt-2">Add Product</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="productName"
                required
                value={fromValues.product_name}
                onChange={enterProductName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Product Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={fromValues.product_details}
                onChange={enterProductDetails}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                aria-describedby="price"
                required
                value={fromValues.product_price}
                onChange={enterProductPrice}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="d-block">
                Image Upload
              </label>
              <div className="choose-file mt-2">
                {fromValues.product_image === "" ? (
                  <div>
                    <label htmlFor="file" className="btn btn-sm border">
                      Choose File
                    </label>
                    <input
                      required
                      onChange={(event) => {
                        uploadProductImage(event.target.files[0]);
                      }}
                      type="file"
                      id="file"
                      className="d-none"
                    />
                  </div>
                ) : (
                  <img
                    className={classes["image-size"]}
                    src={fromValues.product_image}
                  />
                )}
              </div>
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
        <Snackbar open={snackShowBar} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Product Created
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
export default AddProduct;
