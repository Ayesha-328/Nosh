import './App.css';
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import {Routes,Route} from "react-router-dom"
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './pages/Upadate';

function App() {
  const url="http://localhost:5000"
  return (
   <>
   <ToastContainer/>
   <Navbar />
   <hr />
   <div className="app-content">
    <Sidebar />
    <Routes>
      <Route path="/add" element={<Add url={url}/>}/>
      <Route path="/list" element={<List url={url}/>}/>
      <Route path="/orders" element={<Orders url={url}/>}/>
      <Route path="/update/:id" element={<Update url={url} />} />
    </Routes>
   </div>
   </>
  );
}

export default App;
