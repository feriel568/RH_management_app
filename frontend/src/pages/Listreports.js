import React, { useEffect, useState } from "react";
import SideBarAdmin from "../components/SideBarAdmin";
import { Layout, Table, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;

const Listreports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:4005/report');
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response ? error.response.data.message : "Error fetching data");
      }
    };
    
    fetchReports();
  }, []);

  const handleUpdate = (reportId) => {
    console.log("Update report with ID:", reportId);
    // Navigate to the update page here (not included in this code snippet)
  };

  const handleDelete = async (reportId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this report?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:4005/report/${reportId}`);
        setReports(prevState => prevState.filter(item => item.id !== reportId));
        message.success(response.data.message);
      } catch (error) {
        console.error("Error deleting report:", error);
        setError(error.response ? error.response.data.message : "Error deleting report");
      }
    }
  };

  const columns = [
    {
      title: 'Type Rapport',
      dataIndex: 'typerapport',
      key: 'typerapport',
    },
    {
      title: 'Date Génération',
      dataIndex: 'dategeneration',
      key: 'dategeneration',
    },
    {
      title: 'Contenu',
      dataIndex: 'contenu',
      key: 'contenu',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleUpdate(record.id)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this report?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />}>Delete</Button>
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
          <h2>List of Reports</h2>
          {error && <p className="error">{error}</p>}
          <Table
            columns={columns}
            dataSource={reports.map(report => ({ ...report, key: report.id }))}
            pagination={{ pageSize: 5 }}
            rowKey="key"
            style={{ marginTop: "20px" }}
          />
        </Content>
      </Layout>
    </div>
  );
};

const containerFlex = {
  display: "flex",
};

const contentStyle = {
  margin: "24px 16px",
  padding: 24,
  backgroundColor: "#EDF2F4",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default Listreports;
