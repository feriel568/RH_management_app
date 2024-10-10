import React, { useState, useEffect } from "react";
import SideBarAdmin from "../components/SideBarAdmin";
import { Layout, Form, Input, Button, Table, Space, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Sider, Content } = Layout;

const Departments = () => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null); 


  
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:4005/department/all');
      console.log('Fetched departments:', response.data);

      
      if (response.data && Array.isArray(response.data.departments)) {
        setDepartments(response.data.departments); 
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      message.error('Failed to load departments. Please try again later.'); 
    }
  };

  useEffect(() => {
    fetchDepartments(); 
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
  title="Are you sure to delete this department?"
  okText="Yes"
  cancelText="No"
  onConfirm={() => handleDelete(record.id)} 
  okButtonProps={{ type: 'primary', size: 'default', style: { width: '80px' } }} // Adjust width of Yes button
  cancelButtonProps={{ size: 'default', style: { width: '80px' } }} // Adjust width of No button
>
  <Button danger icon={<DeleteOutlined />}>Delete</Button>
</Popconfirm>

        </Space>
      ),
    },
  ];


  const onFinish = async (values) => {
    try {
      if (editingDepartment) {
        // Update existing department
        const response = await axios.put(`http://localhost:4005/department/${editingDepartment.id}`, values);
        message.success('Department updated successfully!');
      } else {
        
        const response = await axios.post('http://localhost:4005/department/create', values);
        message.success('Department created successfully!');
      }

      
      fetchDepartments();
      form.resetFields(); 
      setEditingDepartment(null); 
    } catch (error) {
      console.error('Error saving department:', error);
      message.error('Error saving department. Please try again later.');
    }
  };

  const handleEdit = (department) => {
    form.setFieldsValue({
      name: department.name,
    });
    setEditingDepartment(department); 
  };


  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4005/department/${id}`); 
      setDepartments(departments.filter((item) => item.id !== id)); 
      message.success('Department deleted successfully!');
    } catch (error) {
      message.error('Failed to delete department');
    }
  };

  return (
    <div className="container" style={containerFlex}>
      <div className="sidebar">
        <SideBarAdmin />
      </div>

      <Layout className="site-layout">
        <Content style={contentStyle}>
          {/* Department Form */}
          <div style={formContainerStyle}>
            <Form
              form={form}
              name="departments"
              layout="vertical"
              style={formStyle}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter department name' }]}
              >
                <Input placeholder="Enter department name" />
              </Form.Item>

              <Form.Item>
              <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  htmlType="submit"
                  loading={loading}
                  style={{
  
                    gap: '8px' ,
                    width: '150px',
                    marginBottom : '10px',
                  }}
                >
                  {editingDepartment ? 'Update Department' : 'Add Department'} 
                </Button>
              </Form.Item>
            </Form>

            {/* Department Table */}
            <Table
              columns={columns}
              dataSource={departments.map(department => ({ ...department, key: department.id }))} 
              pagination={{ pageSize: 5 }}
              rowKey="key"
              style={{ marginTop: "20px" }}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

const containerFlex = {
  display: "flex",
};

const formContainerStyle = {
  maxHeight: "600px",
  overflowY: "auto",
  padding: "24px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const contentStyle = {
  margin: "24px 16px",
  padding: 24,
  backgroundColor: "#EDF2F4",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const formStyle = {
  maxWidth: "600px",
  marginTop: "20px",
};

export default Departments;
