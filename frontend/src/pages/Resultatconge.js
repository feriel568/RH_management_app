import React from 'react';
import axios from 'axios';
import '../styles/conge.css'; // Optional: your CSS for styling
import { Table, message , Layout } from 'antd';
import SideBarEmployee from '../components/SideBarEmployee';
const { Content } = Layout;

class Resultatconge extends React.Component {
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
        .get(`http://localhost:4005/demandeconge/${userId}`)
        .then((response) => {
          const demandesWithFormattedDates = response.data.map(demande => ({
            ...demande,
            datedebut: new Date(demande.datedebut).toISOString().split('T')[0], // Extract only the date
            datefin: new Date(demande.datefin).toISOString().split('T')[0],     // Extract only the date
            datedemande: new Date(demande.datedemande).toISOString().split('T')[0], // Extract only the date
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

export default Resultatconge;
