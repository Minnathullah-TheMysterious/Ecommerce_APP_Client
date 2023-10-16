import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import "../../styles/AuthStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/v1/auth/login`,
        { email, password }
      );
  
      const { success, message, user, token } = data;
  
      if (success) {
        toast.success(message);
        setAuth({
          ...auth,
          user: user,
          token: token,
        });
  
        localStorage.setItem("auth", JSON.stringify(data));
        navigate(location.state || "/");
      } else{
        toast.error(message)
      }
    } catch (error) {
      toast.error("Incorrect Email or Password");
    }
  };
  

  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className="form-container">
        <h4 className="title">LOGIN FORM</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <button type="submit" className="btn mb-3 fw-medium">
            LOGIN
          </button>
          <button
            type="button"
            className="btn mb-3 fw-medium"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            FORGOT PASSWORD
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
