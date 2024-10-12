import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Updatereports = () => {
  const { id } = useParams(); // Get the report ID from the URL parameters
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [reports, setReports] = React.useState({
    typerapport: '',
    dategeneration: '',
    contenu: '',
    userId: ''
  });

  React.useEffect(() => {
    // Fetch the current report details
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://localhost:4005/report/${id}`);
        
        // Format dates correctly
        const fetchedReport = {
          ...response.data,
          dategeneration: response.data.dategeneration.split('T')[0] // Format date for input
        };

        setReports(fetchedReport); // Populate state with formatted report data
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    fetchReport();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReports(prevReports => ({ ...prevReports, [name]: value })); // Update the state with new values
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4005/report/${id}`, reports);
      alert("Report updated successfully!");
      navigate('/listReports'); // Navigate back to the list page
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  return (
    <div>
      <h2>Update Report</h2>
      <form onSubmit={handleSubmit}>
        <label>Type Rapport:</label>
        <input
          type="text"
          name="typerapport" // Correct 'name' attribute
          value={reports.typerapport}
          onChange={handleChange}
          required
        />
        
        <label>Date Generation:</label>
        <input
          type="date"
          name="dategeneration" // Correct 'name' attribute
          value={reports.dategeneration}
          onChange={handleChange}
          required
        />
        
        <label>Contenu:</label>
        <input
          type="text"
          name="contenu" // Correct 'name' attribute
          value={reports.contenu}
          onChange={handleChange}
          required
        />
        
        <label>User ID:</label>
        <input
          type="number"
          name="userId" // Correct 'name' attribute
          value={reports.userId}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Report</button>
      </form>
    </div>
  );
};

export default Updatereports;
