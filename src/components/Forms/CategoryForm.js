import React from "react";

const CategoryForm = ({handleSubmit, category, setCategory}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-50">
          <label htmlFor="catName" className="form-label">
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
