
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Home />
          } />
          <Route path="about" element={<About />
          } />
          <Route path="menu" element={<Menu />
          } />
          <Route path="contact" element={<Contact />
          }
           />
          <Route path="cart" element={<Cart />
          } />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
