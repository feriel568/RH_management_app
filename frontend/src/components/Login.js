import React , {useState} from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/reset.css"; 
import "../styles/loginForm.css"; 

import TopBar from "./TopBar";

const  LoginForm = () => {


  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")



  return (
    <div className="login-container">
     
   <TopBar />

      <div className="form-wrapper">
        <h2 className="login-title">Login</h2>
        <Form
          name="login"
          layout="vertical"
         
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
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
    </div>
  );
}

export default LoginForm;
