import React , { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Table, Space, Popconfirm , message} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";
import axios from 'axios';

import SideBarAdmin from "../components/SideBarAdmin";

const { Content } = Layout;

const ListEmployees = () => {

const [users , setUsers] = useState([]);
const [departments, setDepartments] = useState([]);

  const fetchAllEmployees = async () => { 
    try{
      const response = await axios.get('http://localhost:4005/user/all')

      if(response.data && Array.isArray(response.data.users)){
        setUsers(response.data.users)
      }else {
        throw new Error("Unexpected response structure")
      }


    }catch(error){
      console.error('Error fetching employees:', error);
      message.error('Failed to load employees. Please try again later.'); 
    }
  };
  useEffect(() => {
    fetchAllEmployees()
  } , []);

  useEffect(() => {
    axios.get('http://localhost:4005/department/all')
      .then(response => setDepartments(response.data.departments))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);
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
     // dataIndex: 'departmentId',
      key: 'departmentId',
      render: (text, record) => {
        const department = departments.find(dep => dep.id === record.departmentId);
        return department ? department.name : 'N/A'; // Display 'N/A' if no matching department
      },
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">

  
           
            <Popconfirm
  title="Are you sure to delete this department?"
  okText="Yes"
  cancelText="No"
  onConfirm={() => handleDelete(record.id)} 
  okButtonProps={{ type: 'primary', size: 'default', style: { width: '80px' } }} 
  cancelButtonProps={{ size: 'default', style: { width: '80px' } }} 
>
  <Button danger icon={<DeleteOutlined />}>Delete</Button>
</Popconfirm>

          </Space>
        ),
      },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4005/user/${id}`); 
      setUsers(users.filter((item) => item.id !== id)); 
      message.success('user deleted successfully!');
    } catch (error) {
      message.error('Failed to delete user');
    }
  };


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
  style={{
  
    gap: '8px' ,
    width: '150px',
    marginBottom : '10px',
  }}
 
>
  <Link to="/employee/add" style={{ 
    color: 'white', 
    textDecoration: 'none' 
  }}>
    Add Employee
  </Link>
</Button>


          
          <Table 
            columns={columns} 
            dataSource={users.map(user => ({ ...user, key: user.id }))} 
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
