
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Layout from './pages/Layout';
import Shop from './pages/Shop/Shop';
import Home from './pages/Home/Home';
import SignIn from './pages/Login/SignIn/SignIn';
import SignUp from './pages/Login/SignUp/SignUp';
import Category from './conponents/Category/Category';
import ProductDetails from './conponents/ProductDetails/ProductDetails';
import AppContext from './utils/AppContext';
import Nav from './conponents/Header/Nav/Nav';

function App() {

  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />}>

            </Route>
            <Route path='shop' element={<Shop />}>
              {/* <Route path='/category/:id' element={<Category/>} /> */}
            </Route>
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='product/:id' element={<ProductDetails />} />

          </Route>

        </Routes>
      </AppContext>
    </BrowserRouter>

  );
}

export default App;
