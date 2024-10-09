import React from 'react';
import axios from 'axios';
import '../styles/conge.css'; // Optional: your CSS for styling

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
    // Retrieve the userId from localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Fetch demandes by userId
      axios
        .get(`http://localhost:4005/demandeconge/${userId}`)
        .then((response) => {
          this.setState({
            demandes: response.data,
            loading: false, // Data successfully fetched, stop loading
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

    return (
      <div className="conge-result-container">
        <h2>Résultats de vos demandes de congé</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : demandes.length > 0 ? (
          <table className="conge-table">
            <thead>
              <tr>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Type de Congé</th>
                <th>Statut</th>
                <th>Motif</th>
                <th>Date de Demande</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande, index) => (
                <tr key={index}>
                  <td>{demande.datedebut}</td>
                  <td>{demande.datefin}</td>
                  <td>{demande.typeconge}</td>
                  <td>{demande.statut}</td>
                  <td>{demande.motif}</td>
                  <td>{demande.datedemande}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No demandes found.</p>
        )}
      </div>
    );
  }
}

export default Resultatconge;
