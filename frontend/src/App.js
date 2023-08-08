
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
import Basket from './conponents/Basket';
import useBasket from './conponents/Basket/useBasket';
import Profile from './conponents/Profile/Profile';
import MyProfile from './conponents/Profile/MyProfile/MyProfile';
import EditProfile from './conponents/Profile/EditProfile/EditProfile';
import Order from './conponents/Profile/Order/Order';

function App() {
  const {basket, addToBasket} = useBasket()
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
            <Route path='basket' element={<Basket basket={basket}/>}/>
            <Route path='/profile' element={<Profile/>}>
              <Route path='/profile/my-profile' element={<MyProfile />}></Route>
              <Route path='/profile/edit-profile' element={<EditProfile />}></Route>
              <Route path='/profile/order' element={<Order />}></Route>
            </Route>
          </Route>

        </Routes>
      </AppContext>
    </BrowserRouter>

  );
}

export default App;
