import "antd/dist/reset.css"; // Ant Design v5 CSS reset
import '../styles/sideBarAdmin.css'
import { Layout, Menu } from "antd";

import SideBarAdmin from "../components/SideBarAdmin"

const { Sider, Content } = Layout;
const DashAdmin = () => {

 return (


    <div class="container" style={containerFlex}>
    <div class="sidebar">
        <SideBarAdmin />
        </div>    
        
        <Layout className="site-layout">
        <Content style={contentStyle}>
          <h2 style={{ color: "#2B2D42" }}>Welcome to the RH Admin Dashboard</h2>
          <p style={{ color: "#8D99AE" }}>
            Manage your employees, teams, reports, and more.
          </p>
        </Content>
      </Layout>
       
    </div>
        
 )
}


const contentStyle = {
    margin: "24px 16px",
    padding: 24,
    backgroundColor: "#EDF2F4", // Light background for content area
    borderRadius: "10px", // Rounded content area
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for content
  };
  

const containerFlex = {
    display : "flex"
  };
  
export default DashAdmin