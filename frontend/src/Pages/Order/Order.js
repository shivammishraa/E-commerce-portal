import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import CartItems from "../Cart/Casrt-items";
import * as fromOrderService from "./Ordera.service";
const Order = () => {
  const [userOrder, setUserOrder] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = () => {
    const header = {
      Authorization: "Bearer " + userData.access_token,
    };
    fromOrderService
      .getOrder(header)
      .then((res) => {
        setUserOrder(res.data.data);
      })
      .catch((err) => {
      });
  };

  return (
    <div>
      <div className="container mt-3">
        <div className="row justify-content-center text-center mt-3">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h3>Recent Orders</h3>
            </div>
          </div>
        </div>
        {userOrder.map((item, index) => {
          return (
            <div className="card mb-3" id={item._id}>
              <div className="card-body">
                <section className="w-100 d-flex justify-content-between align-items-center">
                  <h2 className="h5">
                    Order #{index + 1} <br />
                    <section className="h6 text-success">
                      {item.order_status}
                    </section>
                  </h2>
                  <h2 className="h5">Total Price : {item.order_price}</h2>
                </section>
                <div>
                  {item.product_item.map((product,indecx) => {
                  
                    return (
                      <CartItems cart={product} hideButtons={true} key={indecx}></CartItems>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Order;
