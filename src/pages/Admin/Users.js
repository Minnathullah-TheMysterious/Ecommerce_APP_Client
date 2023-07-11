import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import SearchUsers from "../../components/Forms/SearchUsers";
import { Button, Modal } from "antd";
import { ImWarning } from "react-icons/im";

const Users = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //Get All Users || GET
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`
      );
      setLoading(false);
      setUsers(data?.users);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error in getting All The Users");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  //DELETE USER BY ID || DELETE
  const handleDeleteUser = async (uId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${uId}`
      );
      if (data?.success) {
        toast.success("User Deleted Successfully");
        getAllUsers();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the User");
    }
  };

  //User Count || GET
  const usersCount = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/users-count`
      );
      setUserCount(data?.totalUserCount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    usersCount();
  }, []);

  //Users Per Page || GET
  const usersPerPage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/users-list/${page}`
      );
      setLoading(false);
      setUsers([...users, ...data?.usersListPerPage]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Users</h1>
            <hr />
            <div className="mb-4">
              <SearchUsers />
            </div>
            <table className="table table-bordered border-primary">
              <thead>
                <tr className="table-dark">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {users?.map((user, index) => (
                  <tr key={user?._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.address}</td>
                    <td>
                      <Button
                      className="fw-medium"
                        type="primary"
                        onClick={() => {
                          showModal();
                          setUserId(user?._id);
                          setUserName(user?.name);
                        }}
                      >
                        DELETE ACCOUNT
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="m-4 p-2 ">
              {users && users.length < userCount && (
                <button
                  className="btn loadmore d-flex ms-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                    usersPerPage();
                  }}
                >
                  {loading ? "...Loading" : "LoadMore"}
                </button>
              )}
            </div>
          </div>
          <Modal
            title={<b className="text-danger fw-bold fs-4" ><ImWarning/> DANGER!</b>}
            open={isModalOpen}
            onOk={() => {
              handleDeleteUser(userId);
              handleOk();
            }}
            onCancel={handleCancel}
          >
            <p>
              Be Careful! It can be Dangerouns.{" "}
              <b className="text-danger">Account will be Permanantly Deleted</b>
              
            </p>
            <p className="fw-medium">
              Do you really Want to <b className="text-danger">Delete</b> the Account
              of <b className="text-danger">{userName}?</b>
            </p>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
