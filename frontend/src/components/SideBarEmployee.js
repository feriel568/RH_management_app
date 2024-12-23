import React from "react";
import { Layout, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  PieChartOutlined,
  LogoutOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "../styles/sideBarAdmin.css";

const { Sider } = Layout;

function SideBarEmployee() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear the token from localStorage (or sessionStorage)
    localStorage.removeItem("token");

    // Redirect to the home page or login page
    navigate("/");
  };

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
          Employee
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
            <NavLink to="/employeedashbord">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />} style={menuItemStyle}>
            <NavLink to="/conge">Holidays</NavLink>
          </Menu.Item>

          <Menu.Item key="3" icon={<ApartmentOutlined />} style={menuItemStyle}>
            <NavLink to="/resultaconge">result holidays</NavLink>
          </Menu.Item>

          <Menu.Item key="4" icon={<UserOutlined />} style={menuItemStyle}>
            <NavLink to="/timesheet/create">TimeSheet</NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />} style={menuItemStyle}>
            <NavLink to="/Evaluationemployeebyid">Evaluation</NavLink>
          </Menu.Item>
         

        

          {/* Logout Menu Item */}
          <Menu.Item
            key="6"
            icon={<LogoutOutlined />}
            style={menuItemStyle}
            onClick={handleLogout} // Handle logout on click
          >
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

export default SideBarEmployee;
