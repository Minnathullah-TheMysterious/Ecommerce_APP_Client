import React from "react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductDelete = ({ pId, productName }) => {
  const navigate = useNavigate();

  //Delete Product function
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `/api/v1/product/delete-product/${pId}`
      );
      toast.success("Prodeuct Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the product");
    }
  };

  return (
    <>
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-danger fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          DELETE PRODUCT
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-warning"
                  id="exampleModalLabel"
                >
                  <AiFillWarning /> WARNING!
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                Do You Really Want To{" "}
                <b className="text-danger fw-bold">DELETE</b> The Product{" "}
                <b className="text-success fw-bold">'{productName}'</b>?
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-primary fw-medium"
                  data-bs-dismiss="modal"
                >
                  NO, GO BACK
                </button>
                <button
                  type="button"
                  className="btn btn-danger fw-medium"
                  onClick={handleDeleteProduct}
                  data-bs-dismiss="modal"
                >
                  YES, DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDelete;
