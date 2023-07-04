import React from "react";

const CategoryForm = ({handleSubmit, category, setCategory}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-50">
          <label htmlFor="catName" className="form-label fw-medium fs-5">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="catName"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-success w-50 fw-bold">
          SUBMIT
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
