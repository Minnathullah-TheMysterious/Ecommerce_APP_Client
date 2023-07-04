import React from "react";
import { AiFillWarning } from "react-icons/ai";

const CategoryDelete = ({ deleteHandler, cId, cName }) => {
  return (
    <>
      <div>
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
                  className="modal-title fs-5 text-danger"
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
                <b className="text-danger fw-bold">DELETE</b> The{" "}
                <b className="text-success fw-bold">'{cName}'</b> Category
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
                  data-bs-dismiss="modal"
                  onClick={() => deleteHandler(cId)}
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

export default CategoryDelete;
