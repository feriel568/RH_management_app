import React , {useEffect , useState} from "react";
import "antd/dist/reset.css"; 
import '../styles/sideBarAdmin.css';
import { Layout, Form, Input, Button, Select, DatePicker, message } from "antd";
import axios from 'axios';
import SideBarAdmin from "../components/SideBarAdmin";

const { Sider, Content } = Layout;
const { Option } = Select;

const AddEmployee = () => {
    const [form] = Form.useForm();
    const [departments , setDepartments] = useState([])

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:4005/user/register', values);
            message.success('User registered successfully');
            console.log('Received values:', response.data);
        } catch (error) {
            message.error('Failed to register user');
            console.error('Error:', error);
        }
    };

    useEffect(()=> {
        const fetchDepartments = async () =>{
            try {
                const response = await axios.get("http://localhost:4005/department/all")
                setDepartments(response.data.departments)
            } catch (error) {
                message.error('Failed to fetch departments')
            }
        }
        fetchDepartments();
    },[])

    return (
        <div class="container" style={containerFlex}>
            <div class="sidebar">
                <SideBarAdmin />
            </div>
            <Layout className="site-layout">
                <Content style={contentStyle}>
                    <div style={formContainerStyle}>
                        <Form
                            form={form}
                            name="register"
                            layout="vertical"
                            onFinish={onFinish}
                            style={formStyle}
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input placeholder="Enter your name" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: 'Please enter your password' }]}
                            >
                                <Input.Password placeholder="Enter your password" />
                            </Form.Item>

                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[{ required: true, message: 'Please select your role' }]}
                            >
                                <Select placeholder="Select your role">
                                    <Option value="Employee">Employee</Option>
                                    <Option value="HRAdmin">HR Admin</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="phone" label="Phone">
                                <Input placeholder="Enter your phone number" />
                            </Form.Item>

                            <Form.Item name="address" label="Address">
                                <Input placeholder="Enter your address" />
                            </Form.Item>

                            <Form.Item
                                name="hireDate"
                                label="Hire Date"
                                rules={[{ required: true, message: 'Please select your hire date' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item name="salary" label="Salary">
                                <Input placeholder="Enter your salary" />
                            </Form.Item>

                            <Form.Item name="jobTitle" label="Job Title">
                                <Input placeholder="Enter your job title" />
                            </Form.Item>

                            <Form.Item
                                name="departmentId"
                                label="Department"
                                rules={[{ required: true, message: 'Please enter your department' }]}
                            >
                                {/* <Input placeholder="Enter your department ID" /> */}
                                <Select
    showSearch
    placeholder="Select your department"
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().includes(input.toLowerCase())
    }
  >
    {departments.map((department) => (
      <Option key={department.id} value={department.id}>
        {department.name}
      </Option>
    ))}
  </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </div>
    );
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

const containerFlex = {
    display: "flex",
};

const formStyle = {
    maxWidth: "600px",
    marginTop: "20px",
};

export default AddEmployee;
