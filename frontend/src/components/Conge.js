import axios from 'axios';
import React from 'react';

class Conge extends React.Component {
  state = {
    DemandeConge: {
      datedebut: '',
      datefin: '',
      typeconge: 'Paid', // Valeur par défaut
      statut: 'pending', // Valeur par défaut
      motif: '',
      datedemande: '',
      userId: '',
    },
  };

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

  handleuserId = (e) => {
    this.setState({
      DemandeConge: {
        ...this.state.DemandeConge,
        userId: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4005/demandeconge', this.state.DemandeConge)
      .then((response) => console.log(response.data))
      .catch((error) => console.error('There was an error!', error));
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
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select><br />
        
        <label>motif:</label>
        <input type="text" onChange={this.handlemotif} /><br />
        
        <label>datedemande:</label>
        <input type="date" onChange={this.handledatedemande} /><br />
        
        <label>userId:</label>
        <input type="number" onChange={this.handleuserId} /><br />
        
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default Conge;
