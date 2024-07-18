import { useContext, useEffect, useState } from "react";
import ProductCard from "../../Components/Product-Card/ProductCard";
import { UserContext } from "../../context/User.context";
import * as fromProductService from "./service/Product-service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Home = () => {
  const [product, setProduct] = useState([]);
  const [showDeleteProduct, setshowDeleteProduct] = useState(false);

  const getProducts = () => {
    fromProductService
      .FetchProducts()
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getProducts();
  }, []);
  const { userData, setUserData } = useContext(UserContext);
  const deleteProduct = (product_id) => {
    const header = {
      Authorization: "Bearer " + userData.access_token,
    };
    fromProductService.deleteProduct(product_id, header).then(
      (deleted) => {
        setshowDeleteProduct(true);
        setTimeout(() => {
          setshowDeleteProduct(false);
        }, 3000);
        getProducts();
      },
      (err) => {
        getProducts();
      }
    );
  };
  return (
    <div>
      <div className="container">
        <header className="bg-dark py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Shop in style</h1>
              <p className="lead fw-normal text-white-50 mb-0">
                With this shop website
              </p>
            </div>
          </div>
        </header>
        <div className="row">
          {product.map((product) => (
            <ProductCard
              className="col-md-6 col-lg-4 col-xl-3"
              product={product}
              user={userData}
              key={product._id}
              onDeleteProduct={deleteProduct}
            />
          ))}
        </div>
      </div>
      <Snackbar open={showDeleteProduct} autoHideDuration={3000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Product Deleted
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Home;
