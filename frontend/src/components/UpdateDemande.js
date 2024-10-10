import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDemande = () => {
  const { id } = useParams(); // Get the demande ID from the URL parameters
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [demande, setDemande] = React.useState({ // Initialize with an object to avoid undefined errors
    datedebut: '',
    datefin: '',
    typeconge: '',
    statut: '',
    motif: '',
    datedemande: '',
    userId: '',
  });

  React.useEffect(() => {
    // Fetch the current demande details
    const fetchDemande = async () => {
      try {
        const response = await axios.get(`http://localhost:4005/demandeconge/demande/${id}`);
        
        // Format dates correctly
        const fetchedDemande = {
          ...response.data,
          datedebut: response.data.datedebut.split('T')[0], // Format date for input
          datefin: response.data.datefin.split('T')[0],
          datedemande: response.data.datedemande.split('T')[0],
        };

        setDemande(fetchedDemande); // Populate state with formatted demande
      } catch (error) {
        console.error("Error fetching demande details:", error);
      }
    };

    fetchDemande();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDemande(prevDemande => ({ ...prevDemande, [name]: value })); // Update the state with new values
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4005/demandeconge/${id}`, demande);
      alert("Demande updated successfully!");
      navigate('/listconge'); // Navigate back to the list page
    } catch (error) {
      console.error("Error updating demande:", error);
    }
  };

  // Wait until demande data is loaded
  if (!demande) {
    return <p>Loading demande data...</p>;
  }

  return (
    <div>
      <h2>Update Demande</h2>
      <form onSubmit={handleSubmit}>
        <label>Date Début:</label>
        <input type="date" name="datedebut" value={demande.datedebut} onChange={handleChange} required />
        
        <label>Date Fin:</label>
        <input type="date" name="datefin" value={demande.datefin} onChange={handleChange} required />
        
        <label>Type de Congé:</label>
        <select name="typeconge" value={demande.typeconge} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Sick">Sick</option>
          <option value="Maternity">Maternity</option>
        </select>

        <label>Statut:</label>
        <select name="statut" value={demande.statut} onChange={handleChange} required>
          <option value="">Select Statut</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <label>Motif:</label>
        <input type="text" name="motif" value={demande.motif} onChange={handleChange} required />

        <label>Date de Demande:</label>
        <input type="date" name="datedemande" value={demande.datedemande} onChange={handleChange} required />

        <label>User ID:</label>
        <input type="number" name="userId" value={demande.userId} onChange={handleChange} required />

        <button type="submit">Update Demande</button>
      </form>
    </div>
  );
};

export default UpdateDemande;
