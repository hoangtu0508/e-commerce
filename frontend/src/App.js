
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Shop from './pages/Shop/Shop';
import Home from './pages/Home/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}>

          </Route>
          <Route path='shop' element={<Shop />}>

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
