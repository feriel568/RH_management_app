import React from 'react';
import axios from 'axios';
import '../styles/conge.css'; // Optional: your CSS for styling
import { Table, message , Layout } from 'antd';
import SideBarEmployee from '../components/SideBarEmployee';
const { Content } = Layout;

class Evaluationbyid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demandes: [], // State to store fetched demandes
      loading: true, // Loading state
      error: null, // Error state
    };
  }

  componentDidMount() {
   
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Fetch demandes by userId
      axios
        .get(`http://localhost:4005/evaluation/${userId}`)
        .then((response) => {
          const demandesWithFormattedDates = response.data.map(demande => ({
            ...demande,
          }));
          
          this.setState({
            demandes: demandesWithFormattedDates,
            loading: false, 
          });
        })
        .catch((error) => {
          this.setState({
            error: error.response ? error.response.data.message : "Error fetching data",
            loading: false,
          });
        });
    } else {
      this.setState({
        error: "User not logged in",
        loading: false,
      });
    }
  }
  


  render() {
    const { demandes, loading, error } = this.state;
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
    const columns = [
      {
        title: 'dateevaluation',
        dataIndex: 'dateevaluation',
        key: 'dateevaluation',
      },
      {
        title: 'score',
        dataIndex: 'score',
        key: 'score',
      },
      {
        title: 'commentaire',
        dataIndex: 'commentaire',
        key: 'commentaire',
      },
      {
        title: 'userId',
        dataIndex: 'userId',
        key: 'userId',
      },
    ];
    return (
      <div className="container" style={containerFlex}>
      <div className="sidebar">
        <SideBarEmployee />
      </div>

      <Layout className="site-layout">
        <Content style={contentStyle}>
          <Table
            columns={columns}
            dataSource={demandes} // Set data source to the fetched timesheets
            pagination={{ pageSize: 5 }}
            rowKey="key"
          />
        </Content>
      </Layout>
    </div>
  );
};

  
}

export default Evaluationbyid;
