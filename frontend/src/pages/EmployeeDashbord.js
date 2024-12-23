import "antd/dist/reset.css"; // Ant Design v5 CSS reset
import '../styles/sideBarAdmin.css';
import { Layout } from "antd";

import SideBarEmployee from "../components/SideBarEmployee";
import Notifications from "../pages/Notification"

const { Content } = Layout;

const DashEmployee = () => {
  return (
    <div className="container" style={containerFlex}>
      <div className="sidebar">
        <SideBarEmployee />
      </div>    

      <Layout className="site-layout">
        <Content style={contentStyle}>
          <h2 style={{ color: "#2B2D42" }}>Welcome to the Employee Dashboard</h2>
          <p style={{ color: "#8D99AE" }}>
            Manage your employees, teams, reports, and more.
          </p>

          {/* Display Notifications Here */}
          <Notifications />
        </Content>
      </Layout>
    </div>
  );
};

const contentStyle = {
  margin: "24px 16px",
  padding: 24,
  backgroundColor: "#EDF2F4", // Light background for content area
  borderRadius: "10px", // Rounded content area
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for content
};

const containerFlex = {
  display: "flex",
};

export default DashEmployee;
