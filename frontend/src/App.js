import React from 'react'
import { ToastContainer } from 'react-toastify';
import Form from './components/Form';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <ToastContainer />
        <Navbar />
      <div className='container'>
        <Form />        
      </div>
    </div>
  );
}

export default App;
