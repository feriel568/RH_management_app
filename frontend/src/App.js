import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import DashAdmin from './pages/DashAdmin';
import AddEmployee from './pages/AddEmployee';
import ListEmployees from './pages/ListEmployees';
import Departments from './pages/Departments';
import EmployeeDashbord from './components/EmployeeDashbord';
import Conge from './components/Conge';
import Listconge from './components/Listconge';
import Resultatconge from './components/Resultatconge';
import UpdateDemande from './components/UpdateDemande';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashAdmin" element={<DashAdmin />} />
        <Route path="/employee/list" element={<ListEmployees />} />
        <Route path="/employee/add" element={<AddEmployee />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employeedashbord" element={<EmployeeDashbord />} />
        <Route path="/conge" element={<Conge />} />
        <Route path="/listconge" element={<Listconge />} />
        <Route path="/resultaconge" element={<Resultatconge />} />
        <Route path="/update/:id" element={<UpdateDemande />} /> {/* Corrected here */}
      </Routes>
    </Router>
  );
}

export default App;
