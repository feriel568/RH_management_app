import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import DashAdmin from './pages/DashAdmin';
import AddEmployee from './pages/AddEmployee';
import ListEmployees from './pages/ListEmployees';
import Departments from './pages/Departments';
import EmployeeDashbord from './pages/EmployeeDashbord';
import Conge from './pages/Conge';
import Listconge from './pages/Listconge';
import Resultatconge from './pages/Resultatconge';
import UpdateDemande from './pages/UpdateDemande';
import Addreports from './pages/Addreports';
import Listreports from './pages/Listreports';
import Updatereports from './pages/Updatereports';

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
        <Route path="/addreports" element={<Addreports />} />
        <Route path="/listReports" element={<Listreports />} />
        <Route path="/updatee/:id" element={<Updatereports />} /> {/* Corrected here */}
        
      </Routes>
    </Router>
  );
}

export default App;
