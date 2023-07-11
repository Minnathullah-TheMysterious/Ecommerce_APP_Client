import axios from "axios";
import Layout from "../components/Layouts/Layout.js";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import { useCart } from "../context/Cart.js";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProducts(data?.product?._id, data?.product?.category?._id);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) {
      getSingleProduct();
    }
  }, [params?.slug]);

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
  };

  return (
    <Layout title="Product Details">
      <div className="container product-details">
        <div className="row mt-4">
          <div className="col-md-6">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
              className="card-img-top img img-responsive"
              alt="Product"
              height={"400px"}
            />
          </div>
          <div className="col-md-6 product-details-info">
            <h1 className="text-center">PRODUCT DETAILS</h1>
            <div className="m-4">
              <h6>Name: {product?.name}</h6>
              <h6>Description: {product?.description}</h6>
              <h6>
                Price:{" "}
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h6>
              <h6>Available Quantity: {product?.quantity}</h6>
              <h6>Category: {product?.category?.name}</h6>
              <h6>
                Shipping:{" "}
                {product.shipping === true
                  ? "Available"
                  : "Not available at your location"}
              </h6>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-4 similar-products container">
          <h4 className="text-center">SIMILAR PRODUCTS</h4>
          {relatedProducts.length < 1 && <p>No Similar Products Found</p>}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                  className="card-img-top img img-responsive"
                  alt="Product"
                  height={"220px"}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => navigate(`/product-details/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary m-1"
                    onClick={() => handleAddToCart(p)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
