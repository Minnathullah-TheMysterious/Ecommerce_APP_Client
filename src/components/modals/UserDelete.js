import React from "react";
import { CgDanger } from "react-icons/cg";

const UserDelete = ({ deleteHandler, user_id, user_name }) => {
  return (
    <>
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
                className="modal-title fs-5 fw-medium text-danger"
                id="exampleModalLabel"
              >
                <CgDanger /> DANGER!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>
                Be Careful! It can be Dangerouns.{" "}
                <b className="text-danger">
                  Account will be Permanantly Deleted
                </b>
              </p>
              <hr />
              <div className="fw-medium">
                Do you really Want to <b className="text-danger">DELETE</b> the Account
                of <b className="text-success">'{user_name}'?</b>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-primary fw-medium"
                data-bs-dismiss="modal"
              >
                No, Go Back
              </button>
              <button
                type="button"
                className="btn btn-outline-danger fw-medium"
                data-bs-dismiss="modal"
                onClick={() => {
                  deleteHandler(user_id);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDelete;
