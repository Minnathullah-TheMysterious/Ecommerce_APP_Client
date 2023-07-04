import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BsSearch} from 'react-icons/bs'

const SearchInput = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="d-flex nav-search" role="search">
        <input
          className="form-control me-1 search-area "
          type="search"
          placeholder="Search Products Here"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success me-4" type="submit" onClick={handleSubmit}>
          <BsSearch/>
        </button>
      </form>
    </>
  );
};

export default SearchInput;
