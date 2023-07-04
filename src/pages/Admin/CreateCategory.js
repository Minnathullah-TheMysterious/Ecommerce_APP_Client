import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "./../../components/Layouts/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";
import CategoryDelete from "./../../components/modals/CategoryDelete";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [catId, setCatId] = useState('')
  const [catName, setCatName] = useState('')

  //Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} Created Successfully`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all the Categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  //Handle update form
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateCategory = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (updateCategory.data.success) {
        toast.success(`${updatedName} updated successfully`);
        setSelected(null);
        setVisible(false);
        setUpdatedName("");
        getAllCategories();
      } else {
        toast.error(updateCategory.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the category");
    }
  };

  //Handle delete
  const handleDelete = async (cId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${cId}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`Category Deleted Successfully`);
        setSelected(null);
        setVisible(false);
        setUpdatedName("");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the category");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Manage Category</h1>
            <hr />
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                category={name}
                setCategory={setName}
              />
            </div>
            <div className="w-75">
              <table className="table table-striped">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                      <tr key={c._id}>
                        <td className="fw-medium">{c.name}</td>
                        <td>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-primary ms-2 w-50 fw-bold"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              EDIT
                            </button>
                            {/* Button trigger modal */}
                            <button
                            onClick={()=>{
                              setCatId(c._id)
                              setCatName(c.name)
                            }}
                              type="button"
                              className="btn btn-danger fw-bold w-50 ms-2"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              DELETE
                            </button>
                          </div>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <CategoryDelete deleteHandler={handleDelete} cId={catId} cName={catName}/>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              category={updatedName}
              setCategory={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
