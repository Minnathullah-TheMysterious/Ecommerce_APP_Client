import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Cart Item
  const removeCardItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //Get Payment Gateway Token
  const getBraintreeToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBraintreeToken();
  }, [auth?.token]);

  //Handke Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container cart-page">
        <div className="row mt-2">
          <div className="col-md-12">
            <h1 className="text-center bg-light mb-1 p-2">
              Hello! Mr. {auth?.token && auth?.user.name}
            </h1>
            <h4 className="text-center" style={{ textDecoration: "underline" }}>
              {cart?.length
                ? `You have ${cart?.length} Items in Your Cart. ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-7">
            {cart?.map((p) => (
              <div className="row card flex-row mb-2" key={p._id}>
                <div className="col-md-5">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img img-responsive"
                    alt="Product"
                    height={"200px"}
                  />
                </div>
                <div className="col-md-7 text-center p-4">
                  <p className="card-name">{p.name.toUpperCase()}</p>
                  <p className="card-price">
                    Price :
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="card-description">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="cart-remove-btn">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeCardItem(p._id)}
                    >
                      REMOVE FROM CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 text-center cart-summary">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4 className="card-price">Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address : {auth?.user?.address}</h4>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Login To Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mb-3">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-success payment-btn "
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "PLACE ORDER"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
