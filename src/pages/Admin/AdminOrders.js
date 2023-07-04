import AdminMenu from "../../components/Layouts/AdminMenu.js";
import Layout from "../../components/Layouts/Layout.js";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { Select } from "antd";

const AdminOrders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  //Get All Orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  //handle status
  const handleChangeStatus = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row mt-4">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Manage All Orders</h1>
            <hr />
            {
              orders.map((o, i) => {
                return (
                  <div className="border shadow mt-2" key={o._id}>
                    <table className="table ">
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
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) =>
                                handleChangeStatus(o?._id, value)
                              }
                              defaultValue={o?.status}
                            >
                              {status?.map((s, i) => (
                                <Select.Option key={i} value={s}>
                                  {s}
                                </Select.Option>
                              ))}
                            </Select>
                          </td>
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
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top img img-responsive"
                              alt="Product"
                              height={"250px"}
                            />
                          </div>
                          <div className="col-md-7 text-center p-4">
                            <p style={{ fontWeight: "bold" }}>
                              {p.name.toUpperCase()}
                            </p>
                            <p className="text-success fw-medium">
                              Price :{" "}
                              {p.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </p>
                            <p className="text-info">
                              {p.description.substring(0, 130)}...
                            </p>
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

export default AdminOrders;
