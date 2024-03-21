import './App.css';
import Home from './screen/Home';
import { BrowserRouter as Router , Routes,Route} from 'react-router-dom';
import Login from './screen/Login';
import SignUp from './screen/SignUp.js';
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
function App() {
  
  return (
      <Router>
        <div>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/createuser" element={<SignUp/>} />
    
          </Routes>
        </div>
          
      </Router>
  );
}

export default App;
