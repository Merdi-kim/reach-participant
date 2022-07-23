import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Interact from './pages/Interact'

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/interact'element={<Interact/>}/>
      </Routes>
    </Router>      
    
  );
}

export default App;