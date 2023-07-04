import React from "react";
import Layout from "../components/Layouts/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import '../styles/Categories.css'

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories - Ecommerce App"}>
      <h1>All Categories</h1>
      <div className="container all-category">
        <div className="d-flex flex-wrap justify-content-evenly">
          {categories.map((c) => (
            <Link to={`/category/${c.slug}`} className="btn btn-outline-success category-btn" key={c._id}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
