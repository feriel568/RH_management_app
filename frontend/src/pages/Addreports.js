import axios from 'axios';
import React from 'react';
import { Form, Input, Button, Layout, message } from 'antd'; 
import { PlusOutlined } from '@ant-design/icons';
import '../styles/conge.css';
import SideBarAdmin from "../components/SideBarAdmin";

const { Content } = Layout;

class Addreports extends React.Component {
  state = {
    report: {
      typerapport: '',
      dategeneration: '',
      contenu: '',
      userId: ''
    },
  };

  handleSubmit = (values) => {
    const reportData = {
      typerapport: values.typerapport,
      dategeneration: values.dategeneration,
      contenu: values.contenu,
      userId: values.userId
    };

    axios.post('http://localhost:4005/report', reportData)
      .then((response) => {
        message.success('Report submitted successfully!');
        window.location.href = 'http://localhost:3000/dashAdmin';
      })
      .catch((error) => {
        message.error('There was an error submitting the report!');
        console.error('Error:', error);
      });
  };

  handleViewReports = () => {
    window.location.href = 'http://localhost:3000/listReports';
  };

  render() {
    return (
      <div className="container" style={containerFlex}>
        <div className="sidebar">
          <SideBarAdmin />
        </div>
        <Layout className="site-layout">
          <Content style={contentStyle}>
            {/* Small Button to view list of reports */}
          

            {/* Form to submit a new report */}
            <Form onFinish={this.handleSubmit} layout="vertical">
              <Form.Item 
                label="Type Rapport" 
                name="typerapport" 
                rules={[{ required: true, message: 'Please enter the report type!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item 
                label="Date Generation" 
                name="dategeneration" 
                rules={[{ required: true, message: 'Please select a generation date!' }]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item 
                label="Contenu" 
                name="contenu" 
                rules={[{ required: true, message: 'Please enter the content!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item 
                label="User ID" 
                name="userId" 
                rules={[{ required: true, message: 'Please enter the user ID!' }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                  Send Report
                </Button><br></br><br></br>
                <div style={topRightButtonStyle}>
              <Button 
                type="primary" 
                size="small" // Make the button small
                onClick={this.handleViewReports} 
                style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
              >
                View ALL Reports
              </Button>
            </div>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </div>
    );
  }
}

const contentStyle = {
  margin: '24px 16px',
  padding: '24px',
  backgroundColor: '#EDF2F4',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const containerFlex = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const topRightButtonStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
};

export default Addreports;
