import React, { useEffect, useState } from 'react';
import SideBarAdmin from "../components/SideBarAdmin";
import { Layout, Button, Table, Space, Popconfirm , message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'; // Make sure to install axios

const { Content } = Layout;

const AllTimeSheets = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabledRows, setDisabledRows] = useState({}); 

  // Fetch all time sheets from the backend
  useEffect(() => {
    const fetchTimeSheets = async () => {
      try {
        const response = await axios.get('http://localhost:4005/timesheet/timesheets/all'); // Replace with your actual API endpoint
        const formattedData = response.data.map(sheet => ({
          key: sheet.id,
          workDays: JSON.parse(sheet.workDays), // Parse workDays JSON string
          totalHours: sheet.totalHours,
          status: sheet.status,
          userId: sheet.userId,
          employeeName: sheet.employeeName || 'Unknown', // Ensure employeeName is included
        }));
        setTimeSheets(formattedData);
      } catch (error) {
        console.error('Error fetching timesheets:', error);
      }
    };

    fetchTimeSheets();
  }, []);

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'WorkDays',
      dataIndex: 'workDays',
      key: 'workDays',
      render: (text) => (
        <div>
          {text.map(day => (
            <div key={day.day}>{`${day.day}: ${day.hours} hours`}</div>
          ))}
        </div>
      )
    },
    {
      title: 'Total Hours',
      dataIndex: 'totalHours',
      key: 'totalHours',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => changeTimeSheetStatus(record.key, 'approved')}
            disabled={disabledRows[record.key] || record.status === 'approved' || record.status === 'rejected'}
            loading={loading}
          >
            Approve
          </Button>          
          <Popconfirm
            title="Are you sure to refuse this timesheet?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => changeTimeSheetStatus(record.key, 'rejected')}
            disabled={disabledRows[record.key] || record.status === 'approved' || record.status === 'rejected'}
            okButtonProps={{ type: 'primary', size: 'default', style: { width: '80px' } }}
            cancelButtonProps={{ size: 'default', style: { width: '80px' } }}
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              disabled={disabledRows[record.key] || record.status === 'approved' || record.status === 'rejected'}
            >
              Refuse
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  

  const changeTimeSheetStatus = async (id,status) => {
    setLoading(true);
    try{
      const response = await axios.patch(`http://localhost:4005/timesheet/status/${id}`, { status });
      if (response.status === 200) {
        message.success(`Timesheet ${status} successfully!`);
        // Update timesheet status in local state
        setTimeSheets(prev => prev.map(sheet => 
          sheet.key === id ? { ...sheet, status } : sheet
        ));
        // Disable the buttons for this row
        setDisabledRows(prev => ({ ...prev, [id]: true }));
      }
    }catch (error) {
      message.error('Error updating timesheet status.');
      console.error(error);
    }
    setLoading(false);
  }


  return (
    <div className="container" style={containerFlex}>
      <div className="sidebar">
        <SideBarAdmin />
      </div>

      <Layout className="site-layout">
        <Content style={contentStyle}>
          <Table
            columns={columns}
            dataSource={timeSheets} // Set data source to the fetched timesheets
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

export default AllTimeSheets;
