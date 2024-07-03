import React from "react";
import "../styles/LoginStyles.css"; // Create a new CSS file for styling
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userType = location.state?.userType || "patient"; // Default to patient if no userType provided
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Form handler
  const onFinishHandler = async (values) => {
    console.log(backendUrl);
    try {
      dispatch(showLoading());
      const res = await axios.post(`${backendUrl}/api/v1/user/login`, values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <Link to="/dashboard" className="brand-link">
        eDispensary
      </Link>
      <div className="login-form">
        <Form layout="vertical" onFinish={onFinishHandler}>
          <h3 className="login-title">
            {userType === "doctor" ? "Doctor Login" : "Patient Login"}
          </h3>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="register-link">
            Not a user? Register here
          </Link>
          <button className="login-button" type="submit">
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
