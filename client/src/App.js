import './App.css';
import Home from './screen/Home';
import { BrowserRouter as Router , Routes,Route} from 'react-router-dom';
import Login from './screen/Login';
import SignUp from './screen/SignUp.js';
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import { CardProvider } from './component/ContextReducer.js';
import MyOrder from './screen/MyOrder.js';
function App() {
  
  return (
     
      <CardProvider>
   <Router>
        <div>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/createuser" element={<SignUp/>} />
            <Route exact path="/myorder" element={<MyOrder/>} />
    
          </Routes>
        </div>
          
      </Router>
</CardProvider>
  );
}

export default App;
