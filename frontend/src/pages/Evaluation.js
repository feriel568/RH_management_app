import axios from 'axios';
import React from 'react';
import { Layout, Form, Input, Button, message } from 'antd';
import SideBarEmployee from '../components/SideBarEmployee';
import '../styles/conge.css';

const { Content } = Layout;

class Evaluation extends React.Component {
  state = {
    evaluation: {
      dateevaluation: '',
      score: '',
      commentaire: '',
      userId: '',
    },
  };

  // Handlers for form fields
  handledateevaluation = (e) => {
    this.setState({
      evaluation: {
        ...this.state.evaluation,  // Fix: Use lowercase "evaluation"
        dateevaluation: e.target.value,
      },
    });
  };

  handlescore = (e) => {
    this.setState({
      evaluation: {
        ...this.state.evaluation,  // Fix: Use lowercase "evaluation"
        score: e.target.value,
      },
    });
  };

  handlecommentaire = (e) => {
    this.setState({
      evaluation: {
        ...this.state.evaluation,  // Fix: Use lowercase "evaluation"
        commentaire: e.target.value,
      },
    });
  };

  handleuserId = (e) => {
    this.setState({
      evaluation: {
        ...this.state.evaluation,  // Fix: Use lowercase "evaluation"
        userId: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    

    // Log the state to verify the data before submission
    console.log('Submitting evaluation:', this.state.evaluation);

    axios
      .post('http://localhost:4005/evaluation', this.state.evaluation)
      .then((response) => {
        console.log(response.data);
        // Show success message
        message.success('Evaluation submitted successfully!');
        // Redirect to employee dashboard
        window.location.href = 'http://localhost:3000/departments';
      })
      .catch((error) => {
        console.error('There was an error!', error);
        message.error('Failed to submit evaluation');
      });
  };

  render() {
    const containerFlex = {
      display: 'flex',
    };

    const formContainerStyle = {
      maxHeight: '600px',
      overflowY: 'auto',
      padding: '24px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      border: '1px solid #ccc',
    };

    const contentStyle = {
      margin: '24px 16px',
      padding: '24px',
      backgroundColor: '#EDF2F4',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const formStyle = {
      maxWidth: '600px',
      marginTop: '20px',
    };

    return (
      <div className="container" style={containerFlex}>
        <div className="sidebar">
          <SideBarEmployee />
        </div>

        <Layout className="site-layout">
          <Content style={contentStyle}>
            <div style={formContainerStyle}>
              <Form name="evaluationForm" layout="vertical" style={formStyle} onFinish={this.handleSubmit}>
                <Form.Item
                  label="Date Evaluation"
                  name="dateevaluation"
                  rules={[{ required: true, message: 'Please select an evaluation date' }]}
                >
                  <Input type="date" onChange={this.handledateevaluation} />
                </Form.Item>

                <Form.Item
                  label="Score"
                  name="score"
                  rules={[{ required: true, message: 'Please enter the score' }]}
                >
                  <Input type="number" onChange={this.handlescore} />
                </Form.Item>

                <Form.Item
                  label="UserID"
                  name="userId"
                  rules={[{ required: true, message: 'Please enter the user ID' }]}
                >
                  <Input type="number" onChange={this.handleuserId} />
                </Form.Item>

                <Form.Item
                  label="Commentaire"
                  name="commentaire"
                  rules={[{ required: true, message: 'Please enter a comment' }]}
                >
                  <Input type="text" onChange={this.handlecommentaire} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '150px', marginBottom: '10px' }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Evaluation;
