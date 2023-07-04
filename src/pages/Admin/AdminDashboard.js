import React from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { useAuth } from "../../context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin - Dashboard"}>
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{ marginTop: "40px" }}>
            <div className="card w-75 p-4">
              <div>
                <b className="fw-medium" style={{ fontSize: "25px" }}>
                  {" "}
                  Admin Name :-
                </b>{" "}
                <b className="fw-bold text-success" style={{ fontSize: "30px" }}>
                  {" "}
                  {auth?.user?.name.toUpperCase()}
                </b>
              </div>
              <hr />
              <div>
                <b className="fw-medium" style={{ fontSize: "25px" }}>
                  {" "}
                  Admin Email :-
                </b>{" "}
                <b className="fw-medium text-success" style={{ fontSize: "30px" }}>
                  {" "}
                  {auth?.user?.email}
                </b>
              </div>
              <hr />
              <div>
                <b className="fw-medium" style={{ fontSize: "25px" }}>
                  {" "}
                  Admin Contact :-
                </b>{" "}
                <b className="fw-medium text-success" style={{ fontSize: "30px" }}>
                  {" "}
                  {auth?.user?.phone}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
