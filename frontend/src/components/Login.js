import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import "../styles/loginForm.css";
import TopBar from "./TopBar";
import Notifications from "../pages/Notification"; // Import the Notifications component

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:4005/user/login", {
        email: values.email,
        password: values.password,
      });

      const { id, role, token } = response.data.user;

      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);

      // Set the logged-in state to true
      setIsLoggedIn(true);

      // Role-based redirection
      if (role === "HRAdmin") {
        navigate("/dashAdmin");
      } else if (role === "Employee") {
        navigate("/employeedashbord");
      } else {
        message.error("Unknown role");
      }

      message.success("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <TopBar />
      <div className="form-wrapper">
        <h2 className="login-title">Login</h2>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleLogin}
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#D90429", borderColor: "#D90429" }}
              block
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Conditionally render Notifications component if logged in */}
      {isLoggedIn && <Notifications />}
    </div>
  );
};

export default LoginForm;
