import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Table, Space, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";

import SideBarAdmin from "../components/SideBarAdmin";

const { Content } = Layout;

const ListEmployees = () => {
  
  const employeesData = [
    {
      key: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Employee',
      department: 'Sales',
      hireDate: '2023-01-01',
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'HR Admin',
      department: 'HR',
      hireDate: '2022-07-15',
    },
   
  ];

  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
         
            <Button
              icon={<EditOutlined />}
            
            >
              Edit
            </Button>
  
           
            <Popconfirm
              title="Are you sure to delete this employee?"
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
  ];

  return (
    <div className="container" style={containerFlex}>
      <div className="sidebar">
        <SideBarAdmin />
      </div>    
      
      <Layout className="site-layout">
        <Content style={contentStyle}>
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            style={{ marginBottom: '20px' }}
          >
            <Link to="/employee/add" style={{ color: 'white' }}>Add Employee</Link>
          </Button>

          
          <Table 
            columns={columns} 
            dataSource={employeesData} 
            pagination={{ pageSize: 5 }} 
            rowKey="key"
          />
        </Content>
      </Layout>
    </div>
  );
};


const contentStyle = {
  margin: "24px 16px",
  padding: 24,
  backgroundColor: "#EDF2F4", 
  borderRadius: "10px", 
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
};

const containerFlex = {
  display: "flex"
};

export default ListEmployees;
