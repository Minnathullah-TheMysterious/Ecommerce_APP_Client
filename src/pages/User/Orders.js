import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  //Get Orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Your Orders</h1>
            <hr />
            {
              orders.map((o, i) => {
                return (
                  <div className="border shadow mt-2" key={o._id}>
                    <table className="table">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p) => (
                        <div className="row card flex-row mb-2" key={p._id}>
                          <div className="col-md-5">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top img img-responsive"
                              alt="Product"
                              height={"250px"}
                            />
                          </div>
                          <div className="col-md-7 text-center p-4">
                            <p className="fw-bold">{p.name.toUpperCase()}</p>
                            <p className="text-success fw-medium">
                              Price :{" "}
                              {p.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </p>
                            <p>{p.description.substring(0, 150)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }) //o --> order, i --> index
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
