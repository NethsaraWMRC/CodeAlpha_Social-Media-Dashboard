import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/HomePage/Home';
import Facebook from './pages/Facebook';
import LinkedIn from './pages/LinkedIn/LinkedIn';


function App() {
  return (
   <Router>
    
    <Routes>

      <Route path='/' Component={Home}/>
      <Route path='/facebook' Component={Facebook}/>
      <Route path='/linkedin' Component={LinkedIn}/>


    </Routes>
   </Router>
  );
}

export default App;

