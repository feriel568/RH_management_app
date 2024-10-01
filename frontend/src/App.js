import './App.css';
// import 'antd/dist/antd.css';
import { BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom';
import LoginForm from './components/Login';
import DashAdmin from './pages/DashAdmin';
function App() {
  return (
    // <LoginForm />

    <Router>
      <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashAdmin" element={<DashAdmin />}/>
      </Routes>
      
    </Router>
  );
}

export default App;
