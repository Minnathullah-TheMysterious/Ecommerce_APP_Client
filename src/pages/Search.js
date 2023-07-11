import React from "react";
import Layout from "../components/Layouts/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();

  //context api
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search Results"}>
      <div className="container " style={{marginTop: '80px'}}>
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values.results?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top img img-responsive"
                  alt="Product"
                  height={"220px"}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => navigate(`/product-details/${p.slug}`)}
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
                      toast.success('Item Added To Cart')
                    }}
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

export default Search;
