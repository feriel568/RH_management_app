import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, Space, message } from 'antd';
import axios from 'axios';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const CreateTimeSheet = () => {
  const [workDays, setWorkDays] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Retrieve user ID from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      message.error('No user ID found in local storage!');
    }
  }, []);

  // Add a new workday (with selected day and hours)
  const handleAddDay = () => {
    setWorkDays([...workDays, { day: '', hours: '' }]);
  };

  // Update the selected day or hours in the form
  const handleInputChange = (index, key, value) => {
    const updatedWorkDays = [...workDays];
    updatedWorkDays[index][key] = value;
    setWorkDays(updatedWorkDays);
    calculateTotalHours(updatedWorkDays);
  };

  // Remove a specific day from the list
  const handleRemoveDay = (index) => {
    const updatedWorkDays = workDays.filter((_, i) => i !== index);
    setWorkDays(updatedWorkDays);
    calculateTotalHours(updatedWorkDays);
  };

  // Calculate total hours worked
  const calculateTotalHours = (days) => {
    const total = days.reduce((acc, curr) => acc + parseInt(curr.hours || 0, 10), 0);
    setTotalHours(total);
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      const payload = { workDays, totalHours, status: 'pending' };

      if (userId) {
        await axios.post(`http://localhost:4005/timesheet/${userId}`, payload);
        message.success('Timesheet created successfully!');
      } else {
        message.error('User ID is not available');
      }
    } catch (error) {
      message.error('Error creating timesheet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <Form
        layout="vertical"
        name="create-timesheet"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={formStyle}
      >
        {workDays.map((workDay, index) => (
          <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item label="Day" required>
              <Select
                placeholder="Select day"
                value={workDay.day}
                onChange={(value) => handleInputChange(index, 'day', value)}
                style={{ width: 160 }}
              >
                <Option value="Monday">Monday</Option>
                <Option value="Tuesday">Tuesday</Option>
                <Option value="Wednesday">Wednesday</Option>
                <Option value="Thursday">Thursday</Option>
                <Option value="Friday">Friday</Option>
                <Option value="Saturday">Saturday</Option>
                <Option value="Sunday">Sunday</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Hours" required>
              <Input
                placeholder="Hours"
                value={workDay.hours}
                onChange={(e) => handleInputChange(index, 'hours', e.target.value)}
                type="number"
                min={0}
                style={{ width: 100 }}
              />
            </Form.Item>

            <MinusCircleOutlined onClick={() => handleRemoveDay(index)} style={{ color: 'red' }} />
          </Space>
        ))}

        <Form.Item>
          <Button type="dashed" onClick={handleAddDay} icon={<PlusOutlined />}>
            Add Day
          </Button>
        </Form.Item>

        <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Total Hours: {totalHours}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Timesheet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const containerStyle = {
  margin: '24px 16px',
  padding: '24px',
  backgroundColor: '#EDF2F4', // Use previous colors
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formStyle = {
  maxWidth: '600px',
  margin: '0 auto',
};

export default CreateTimeSheet;
