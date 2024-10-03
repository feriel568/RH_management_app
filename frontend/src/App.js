import './App.css';
// import 'antd/dist/antd.css';
import { BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom';
import LoginForm from './components/Login';
import DashAdmin from './pages/DashAdmin';
import AddEmployee from './pages/AddEmployee';
import ListEmployees from './pages/ListEmployees';
function App() {
  return (
    // <LoginForm />

    <Router>
      <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashAdmin" element={<DashAdmin />}/>
      <Route path="/employee/list" element={<ListEmployees />} />

        <Route path="/employee/add" element={<AddEmployee />} />
      </Routes>
      
    </Router>
  );
}

export default App;
