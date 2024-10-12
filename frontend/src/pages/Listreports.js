import React from 'react';
import '../styles/conge1.css'; // Include CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Listreports = () => {
  const [reports, setreports] = React.useState([]);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  React.useEffect(() => {
    axios
      .get('http://localhost:4005/report')
      .then((response) => setreports(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.response ? error.response.data.message : "Error fetching data");
      });
  }, []);

  const handleUpdate = (reportsId) => {
    console.log("Update demande with ID:", reportsId);
    navigate(`/updatee/${reportsId}`); // Use navigate to go to the update page
  };
  
  const handleDelete = (reportsId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this demande?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:4005/report/${reportsId}`)
        .then((response) => {
            setreports(prevState => prevState.filter(item => item.id !== reportsId));
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
      <h2>List of Reports</h2>
      {error && <p className="error">{error}</p>}
      <table className="conge-table">
        <thead>
          <tr>
            <th>typerapport</th>
            <th>dategeneration</th>
            <th>contenu</th>
            <th>userId</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item) => (
            <tr key={item.id}> {/* Use a unique key */}
              <td>{item.typerapport}</td>
              <td>{item.dategeneration}</td>
              <td>{item.contenu}</td>
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

export default Listreports;
