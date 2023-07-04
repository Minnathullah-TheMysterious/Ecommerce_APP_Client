import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/Auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  //Get User data
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  //handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        { name, email, phone, address, password }
      );
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user: data?.updatedUser})
        let ls = localStorage.getItem('auth')
        ls= JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success('Profile Updated Successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the profile");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid" style={{marginTop: '50px'}}>
        <div className="row">
          <div className="col-md-3 mt-4 p-4">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <h4 className="title">USER PROFILE</h4>
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <input
                    type="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="form-control"
                    id="name"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control"
                    id="password"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="form-control"
                    id="phone"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Leave your address here"
                    id="address"
                    style={{ height: "50px" }}
                  ></textarea>
                </div>
                <button type="submit" className="btn fw-medium">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
