import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { Navbar, Sidebar, Footer } from './components/commons';
import {ToastContainer} from 'react-toastify';
import {Verificatetoken} from './services';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const App = () =>{
  return(
    <BrowserRouter>
     <Verificatetoken>
        <div className = 'main-container'>

          <div className = "row">
            <Sidebar/>
            <div className = "col">
              <Navbar/>
              <div  className="container">
                <Routes />
              </div>
              <Footer/>
            </div>
          </div>
          
        </div>
        <ToastContainer/>
      </Verificatetoken>
    </BrowserRouter>
  )
}

export default App;
