import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/Auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9" style={{ marginTop: "40px" }}>
            <div className="card w-75 p-4">
              <div>
                <b className="fw-medium" style={{ fontSize: "25px" }}>
                  {" "}
                  User Name :-
                </b>{" "}
                <b
                  className="fw-bold"
                  style={{ fontSize: "30px", color: "#01527f" }}
                >
                  {" "}
                  {auth?.user?.name.toUpperCase()}
                </b>
              </div>
              <hr />
              <div>
                <b className="fw-medium" style={{ fontSize: "25px" }}>
                  {" "}
                  User Email :-
                </b>{" "}
                <b
                  className="fw-medium"
                  style={{ fontSize: "30px", color: "#01527f" }}
                >
                  {" "}
                  {auth?.user?.email}
                </b>
              </div>
              <hr />
              <div>
                <b className="fw-medium" style={{ fontSize: "25px" }}>
                  {" "}
                  User Address :-
                </b>{" "}
                <b
                  className="fw-medium"
                  style={{ fontSize: "30px", color: "#01527f" }}
                >
                  {" "}
                  {auth?.user?.address}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
