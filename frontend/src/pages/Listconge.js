import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Layout, Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SideBarAdmin from "../components/SideBarAdmin";

const { Content } = Layout;

const Listconge = () => {
  const [demandeconge, setDemandeconge] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDemandeConge = async () => {
      try {
        const response = await axios.get('http://localhost:4005/demandeconge');
        setDemandeconge(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response ? error.response.data.message : "Error fetching data");
      }
    };
    
    fetchDemandeConge();
  }, []);

  const handleUpdate = (demandeId) => {
    navigate(`/update/${demandeId}`);
  };

  const handleDelete = async (demandeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this demande?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:4005/demandeconge/${demandeId}`);
        setDemandeconge(prevState => prevState.filter(item => item.id !== demandeId));
        message.success(response.data.message);
      } catch (error) {
        console.error("Error deleting demande:", error);
        setError(error.response ? error.response.data.message : "Error deleting data");
      }
    }
  };

  const columns = [
    {
      title: 'Date Début',
      dataIndex: 'datedebut',
      key: 'datedebut',
    },
    {
      title: 'Date Fin',
      dataIndex: 'datefin',
      key: 'datefin',
    },
    {
      title: 'Type de Congé',
      dataIndex: 'typeconge',
      key: 'typeconge',
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
    },
    {
      title: 'Motif',
      dataIndex: 'motif',
      key: 'motif',
    },
    {
      title: 'Date de Demande',
      dataIndex: 'datedemande',
      key: 'datedemande',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record.id)}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this demande?"
            onConfirm={() => handleDelete(record.id)}
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
          <h2>List of Congés</h2>
          {error && <p className="error">{error}</p>}
          <Table
            columns={columns}
            dataSource={demandeconge.map(item => ({ ...item, key: item.id }))}
            pagination={{ pageSize: 5 }}
            rowKey="key"
            style={{ marginTop: '20px' }}
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

export default Listconge;
