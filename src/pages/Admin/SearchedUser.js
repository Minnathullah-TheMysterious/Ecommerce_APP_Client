import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useSearchUser } from "../../context/SearchUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import UserDelete from "../../components/modals/UserDelete";

const SearchedUser = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [value] = useSearchUser();
  const navigate = useNavigate();

  //DELETE USER BY ID || DELETE
  const handleDeleteUser = async (uId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/auth/delete-user/${uId}`
      );
      if (data?.success) {
        toast.success("User Deleted Successfully");
        navigate("/dashboard/admin/users");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the User");
    }
  };

  return (
    <Layout title={"Searched User"}>
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {value?.results?.length < 1
              ? "No Users Found"
              : `Found ${value?.results?.length}`}
          </h6>
            <table className="table table-bordered border-primary">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {value?.results?.map((user, index) => (
                  <tr key={user?._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.address}</td>
                    <td>
                      {/* Button trigger modal */}
                      <button
                        type="button"
                        className="btn btn-danger fw-medium"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setUserId(user?._id);
                          setUserName(user?.name);
                        }}
                      >
                        Delete Account
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        <UserDelete
          deleteHandler={handleDeleteUser}
          user_id={userId}
          user_name={userName}
        />
      </div>
    </Layout>
  );
};

export default SearchedUser;
