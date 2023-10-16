import React from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearchUser } from "../../context/SearchUser";

const SearchUsers = () => {
  const [value, setValue] = useSearchUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/auth/search-user/${value.keyword}`
      );
      setValue({ ...value, results: data });
      navigate("/dashboard/admin/search-user");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="d-flex nav-search" role="search">
        <input
          className="form-control me-1 search-area "
          type="search"
          placeholder="Search User Here"
          aria-label="Search"
          value={value.keyword}
          onChange={(e) => setValue({ ...value, keyword: e.target.value })}
        />
        <button
          className="btn btn-outline-success me-4"
          type="submit"
          onClick={handleSubmit}
        >
          <BsSearch />
        </button>
      </form>
    </>
  );
};

export default SearchUsers;
