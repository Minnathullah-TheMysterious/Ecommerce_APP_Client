import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CategoryWiseProduct.css";
import { useCart } from "../context/Cart";

const CategoryWiseProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  //context api
  const [cart, setCart] = useCart();

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/product-category/${params.slug}`
        );
        setProducts(data?.products);
        setCategory(data?.category);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.slug) {
      getProductsByCategory();
    }
  }, [params?.slug]);

  return (
    <Layout title={`Categories - ${category?.name}`}>
      <div className="container mt-4 category">
        <h3 className="text-center">Category : {category?.name}</h3>
        <h6 className="text-center">{products?.length} Results Found</h6>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
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
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <button
                  className="btn btn-primary m-1"
                  onClick={(e) => {
                    navigate(`/product-details/${p.slug}`);
                  }}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary m-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryWiseProduct;
