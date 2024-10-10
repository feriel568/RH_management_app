import React from 'react';
import '../styles/conge1.css'; // Include CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Listconge = () => {
  const [demandeconge, setDemandeconge] = React.useState([]);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  React.useEffect(() => {
    axios
      .get('http://localhost:4005/demandeconge')
      .then((response) => setDemandeconge(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.response ? error.response.data.message : "Error fetching data");
      });
  }, []);

  const handleUpdate = (demandeId) => {
    console.log("Update demande with ID:", demandeId);
    navigate(`/update/${demandeId}`); // Use navigate to go to the update page
  };
  
  const handleDelete = (demandeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this demande?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:4005/demandeconge/${demandeId}`)
        .then((response) => {
          setDemandeconge(prevState => prevState.filter(item => item.id !== demandeId));
          alert(response.data.message);
        })
        .catch((error) => {
          console.error("Error deleting demande:", error);
          setError(error.response ? error.response.data.message : "Error deleting data");
        });
    }
  };

  return (
    <div className="conge-table-container">
      <h2>List of Congés</h2>
      {error && <p className="error">{error}</p>}
      <table className="conge-table">
        <thead>
          <tr>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Type de Congé</th>
            <th>Statut</th>
            <th>Motif</th>
            <th>Date de Demande</th>
            <th>User ID</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {demandeconge.map((item) => (
            <tr key={item.id}> {/* Use a unique key */}
              <td>{item.datedebut}</td>
              <td>{item.datefin}</td>
              <td>{item.typeconge}</td>
              <td>{item.statut}</td>
              <td>{item.motif}</td>
              <td>{item.datedemande}</td>
              <td>{item.userId}</td>
              <td>
                <button onClick={() => handleUpdate(item.id)}>Update</button> {/* Update button */}
                <button onClick={() => handleDelete(item.id)}>Delete</button> {/* Delete button */}
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listconge;
