
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Layout from './pages/Layout';
import Shop from './pages/Shop/Shop';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}>

          </Route>
          <Route path='shop' element={<Shop />}>

          </Route>
          <Route path='sign-in' element={<SignIn />} />

        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
