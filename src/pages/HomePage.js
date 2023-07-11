import Layout from "../components/Layouts/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../context/Cart";
import { useRef } from "react";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  //Get Products per page
  const pageRef = useRef(page);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/product-list/${pageRef.current}`
        );
        setLoading(false);
        setProducts(data?.products);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  //Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Get Total Count
  useEffect(() => {
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

    getTotalCount();
  }, [total]);

  //Load More
  useEffect(() => {
    const loadMore = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
        );
        setProducts((prevProducts) => [...prevProducts, ...data?.products]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (page !== 1) {
      loadMore();
    }
  }, [page, setProducts]);

  //Handle Category Filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //Get Filtered Product

  useEffect(() => {
    const filterProduct = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/product/filter-product`,
          { checked, radio }
        );
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };

    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <img
        src="/images/banner.jpg"
        className="banner-img img-responsive"
        alt="bannerimage"
        height={"300px"}
        width={"100%"}
      />
      <div className="container-fluid home-page">
        <div className="row mt-3">
          <div className="col-md-2 filters">
            {/*Filter by category  */}
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c, i) => (
                <Checkbox
                  className="m-1"
                  key={`${c._id}-${i}`}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* Filter by Price */}
            <h4 className="text-center mt-2">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p, i) => (
                  <div key={`${p._id}-${i}`}>
                    <Radio className="m-1" value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="text-center mt-1 ">
              <button
                className="btn btn-danger w-100"
                onClick={() => window.location.reload()}
              >
                RESET FILTER
              </button>
            </div>
          </div>
          <div className="col-md-10">
            <h1 className="text-center">All Products</h1>
            <hr />
            <div className="d-flex flex-wrap">
              {products?.map((p, i) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={`${p._id}-${i}`}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
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
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-4 p-2 ">
              {products && products.length < total && (
                <button
                  className="btn loadmore "
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

export default HomePage;
