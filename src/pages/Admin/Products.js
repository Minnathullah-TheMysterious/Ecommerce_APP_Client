import Layout from "../../components/Layouts/Layout";
import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  //Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data?.product); 
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting the products");
    }
  };
  //Lifecyle Method
  useEffect(() => {
    getAllProducts();
  }, []);

  //Get Total Count
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotalCount();
  }, []);

  //Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title="Dashboard - Products">
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <hr />
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/update-product/${p.slug}`}
                  key={p._id}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "16rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top img img-responsive"
                      alt={p.name}
                      height={"270px"}
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text text-success fw-medium">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Quantity : {p.quantity}</p>
                        <p>Shipping : {p.shipping === true ? 'Yes' : 'No'}</p>
                      </div>
                      <p className="card-text" style={{fontSize: '12px'}}>
                          {p.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="m-4 p-2 ">
              {products && products.length < total && (
                <button
                  className="btn loadmore d-flex ms-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "...Loading" : "LoadMore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
