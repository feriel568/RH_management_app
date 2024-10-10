import axios from 'axios';
import React from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';

import '../styles/conge.css';
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

  handletypeconge = (e) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        typeconge: e.target.value,
      },
    });
  };

  handlestatut = (e) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        statut: e.target.value,
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
    e.preventDefault();
    axios.post('http://localhost:4005/demandeconge', this.state.DemandeConge)
      .then((response) => {
        console.log(response.data);
        // Afficher une alerte de succès
        window.alert('Demande de congé envoyée avec succès !');
        // Rediriger vers la page /employeedashboard
       
        window.location.href = 'http://localhost:3000/employeedashbord'; 
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  render() {
    return (
      <div className="register-container">
        <label>datedebut:</label>
        <input type="date" onChange={this.handledatedebut} /><br />
        
        <label>datefin:</label>
        <input type="date" onChange={this.handledatefin} /><br />
        
        <label>typeconge:</label>
        <select onChange={this.handletypeconge} value={this.state.DemandeConge.typeconge}>
          <option value="Paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="sick">Sick</option>
          <option value="Maternity">Maternity</option>
        </select><br />
        
        <label>statut:</label>
        <select onChange={this.handlestatut} value={this.state.DemandeConge.statut}>
          <option value="pending">Pending</option>
          
        </select><br />
        
        <label>motif:</label>
        <input type="text" onChange={this.handlemotif} /><br />
        
        <label>datedemande:</label>
        <input type="date" onChange={this.handledatedemande} /><br />
        
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default Conge;
