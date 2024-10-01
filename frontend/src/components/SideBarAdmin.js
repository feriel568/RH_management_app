import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css"; // Ant Design v5 CSS reset
import '../styles/sideBarAdmin.css'

const { Sider, Content } = Layout;

function SideBarAdmin() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Sider
        style={{
          backgroundColor: "#2B2D42", 
          color: "#EDF2F4", 
          borderRadius: "0 20px 20px 0", 
          overflow: "hidden", 
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", 
        }}
        width={240}
        >
       
        <div className="logo" style={logoStyle}>
          RH Admin
        </div>

        
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "#2B2D42",
            
            border: "none",
          }}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />} style={menuItemStyle}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} style={menuItemStyle}>
            Employees
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />} style={menuItemStyle}>
            Teams
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />} style={menuItemStyle}>
            Reports
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} style={menuItemStyle}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

    
      
    </Layout>
  );
}

const logoStyle = {
  height: "64px",
  margin: "16px",
  fontSize: "24px",
  color: "#EDF2F4", 
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  borderBottom: "1px solid #8D99AE", 
};

const menuItemStyle = {
    color: "#EDF2F4", 
    backgroundColor: "#2B2D42", 
    borderColor: "#D90429", 
    borderRadius: "10px", 
    margin: "10px 15px", 
    overflow: "hidden",  
};

export default SideBarAdmin;





