import axios from 'axios';
import React from 'react';
import { Layout ,Form, Input, Button, message, Select } from 'antd';

import SideBarEmplyee from '../components/SideBarEmployee'
import '../styles/conge.css';
const { Sider, Content } = Layout;
const { Option } = Select; 
class Conge extends React.Component {
  state = {
    DemandeConge: {
      datedebut: '',
      datefin: '',
      typeconge: 'Paid', // Valeur par défaut
      statut: 'pending', // Valeur par défaut
      motif: '',
      datedemande: '',
      userId: '', // userId sera automatiquement rempli lors du montage du composant
    },
  };

  // Récupérer le userId du localStorage lors du montage du composant
  componentDidMount() {
    const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur stocké
    if (userId) {
      this.setState({
        DemandeConge: {
          ...this.state.DemandeConge,
          userId: userId, // Mettre à jour le userId dans l'état
        },
      });
    } else {
      console.error("User not logged in");
      // Vous pouvez rediriger vers la page de login si userId n'existe pas
      this.props.navigate('/login');
    }
  }

  // Handlers pour les champs de formulaire
  handledatedebut = (e) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        datedebut: e.target.value,
      },
    });
  };

  handledatefin = (e) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        datefin: e.target.value,
      },
    });
  };

  handletypeconge = (value) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        typeconge: value, 
      },
    });
  };
  
  handlestatut = (value) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        statut: value, 
      },
    });
  };

  handlemotif = (e) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        motif: e.target.value,
      },
    });
  };

  handledatedemande = (e) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        datedemande: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
 //   e.preventDefault();
    axios.post('http://localhost:4005/demandeconge', this.state.DemandeConge)
      .then((response) => {
        console.log(response.data);
        // Afficher une alerte de succès
        message.success('Holiday request created successfully !');
        // Rediriger vers la page /employeedashboard
       
        window.location.href = 'http://localhost:3000/employeedashbord'; 
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  render() {
    // return (

    //   <div className="register-container">
    //     <label>datedebut:</label>
    //     <input type="date" onChange={this.handledatedebut} /><br />
        
    //     <label>datefin:</label>
    //     <input type="date" onChange={this.handledatefin} /><br />
        
    //     <label>typeconge:</label>
    //     <select onChange={this.handletypeconge} value={this.state.DemandeConge.typeconge}>
    //       <option value="Paid">Paid</option>
    //       <option value="unpaid">Unpaid</option>
    //       <option value="sick">Sick</option>
    //       <option value="Maternity">Maternity</option>
    //     </select><br />
        
    //     <label>statut:</label>
    //     <select onChange={this.handlestatut} value={this.state.DemandeConge.statut}>
    //       <option value="pending">Pending</option>
          
    //     </select><br />
        
    //     <label>motif:</label>
    //     <input type="text" onChange={this.handlemotif} /><br />
        
    //     <label>datedemande:</label>
    //     <input type="date" onChange={this.handledatedemande} /><br />
        
    //     <button onClick={this.handleSubmit}>Send</button>
    //   </div>
    // );
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
          <SideBarEmplyee />
        </div>
    
        <Layout className="site-layout">
          <Content style={contentStyle}>
            <div style={formContainerStyle}>
              <Form name="leaveRequest" layout="vertical" style={formStyle} onFinish={this.handleSubmit}>
                
                {/* Datedebut */}
                <Form.Item
                  label="Datedebut"
                  name="datedebut"
                  rules={[{ required: true, message: 'Please select start date' }]}
                >
                  <Input type="date" onChange={this.handledatedebut} />
                </Form.Item>
    
                {/* Datefin */}
                <Form.Item
                  label="Datefin"
                  name="datefin"
                  rules={[{ required: true, message: 'Please select end date' }]}
                >
                  <Input type="date" onChange={this.handledatefin} />
                </Form.Item>
    
                {/* Typeconge */}
                <Form.Item
                  label="Typeconge"
                  name="typeconge"
                  rules={[{ required: true, message: 'Please select leave type' }]}
                >
                  <Select onChange={this.handletypeconge} value={this.state.DemandeConge.typeconge}>
                    <Select.Option value="Paid">Paid</Select.Option>
                    <Select.Option value="unpaid">Unpaid</Select.Option>
                    <Select.Option value="sick">Sick</Select.Option>
                    <Select.Option value="Maternity">Maternity</Select.Option>
                  </Select>
                </Form.Item>
    
                {/* Statut */}
                <Form.Item label="Statut" name="statut">
                  <Select onChange={this.handlestatut} value={this.state.DemandeConge.statut}>
                    <Select.Option value="pending">Pending</Select.Option>
                  </Select>
                </Form.Item>
    
                {/* Motif */}
                <Form.Item
                  label="Motif"
                  name="motif"
                  rules={[{ required: true, message: 'Please enter a reason' }]}
                >
                  <Input type="text" onChange={this.handlemotif} />
                </Form.Item>
    
                {/* Datedemande */}
                <Form.Item
                  label="Datedemande"
                  name="datedemande"
                  rules={[{ required: true, message: 'Please select request date' }]}
                >
                  <Input type="date" onChange={this.handledatedemande} />
                </Form.Item>
    
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      gap: '8px',
                      width: '150px',
                      marginBottom: '10px',
                    }}
                  >
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    );
    
    // Styles
    
    
  }
  
}

export default Conge;
