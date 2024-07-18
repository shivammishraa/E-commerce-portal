import classes from "./Cart.module.css";
export const CartItems = (props) => {
  const updateCart = (quantity) => {
    const data = {
      product: props.cart.product._id,
      quantity: quantity,
    };
    props.updateCart(data);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <div>
              <img
                src={props.cart.product.product_image}
                alt="Shopping item"
                className={`${classes["w-65"]} img-fluid rounded-3`}
              />
            </div>
            <div className="ms-3">
              <h5>{props.cart.product.product_name}</h5>
              {/*   <p className="small mb-0">256GB, Navy Blue</p> */}
            </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div className={`${classes["w-80"]}`}>
              {props.hideButtons ? (
                <h5 className="fw-normal mb-0 text-center">{props.cart.quantity}</h5>
              ) : (
                <span className=" d-flex justify-content-evenly align-items-center">
                  <span
                    className="text-danger h2"
                    onClick={() => {
                      updateCart(-1);
                    }}
                  >
                    -
                  </span>
                  <h5 className="fw-normal mb-0 text-center">{props.cart.quantity}</h5>
                  <span
                    className="text-primary h2"
                    onClick={() => {
                      updateCart(1);
                    }}
                  >
                    +
                  </span>
                </span>
              )}
            </div>
            <div className={`${classes["w-80"]}`}>
              <h5 className="mb-0">
                {props.cart.product.product_price * props.cart.quantity}
              </h5>
            </div>
            <a href="#!" className={`${classes["color-style"]}`}>
              <i className="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItems;
