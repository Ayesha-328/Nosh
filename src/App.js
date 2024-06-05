
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Menu from './pages/Menu';
import './App.css';

function App() {

 
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>
    }  />
    <Route path="/about" element={<About/>
    }  />
    <Route path="/menu" element={<Menu/>
    }  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
