
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
import AdminLayout from './Admin/AdminLayout';
import Dashboard from './Admin/components/pages/Dashboard/Dashboard';
import NewProducts from './Admin/components/pages/Products/NewProducts/NewProducts';
import NewCategories from './Admin/components/pages/Categories/NewCategories/NewCategories';
import Products from './Admin/components/pages/Products/Products';
import Categories from './Admin/components/pages/Categories/Categories';
import Orders from './Admin/components/pages/Orders/Orders';
import Customers from './Admin/components/pages/Customers/Customers';
import EditProduct from './Admin/components/pages/Products/EditProduct/EditProduct';
import EditCategory from './Admin/components/pages/Categories/EditCategory/EditCategory';
import OrderDetail from './Admin/components/pages/Orders/OrderDetail/OrderDetail';
import CustomersDetails from './Admin/components/pages/Customers/CustomersDetails/CustomersDetails';
import Overview from './Admin/components/pages/Customers/CustomersDetails/Overview/Overview';

function App() {
  const { basket, addToBasket } = useBasket()
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
            <Route path='basket' element={<Basket basket={basket} />} />
            <Route path='/profile' element={<Profile />}>
              <Route path='/profile/my-profile' element={<MyProfile />}></Route>
              <Route path='/profile/edit-profile' element={<EditProfile />}></Route>
              <Route path='/profile/order' element={<Order />}></Route>
            </Route>
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route path='/admin' element={<Dashboard />}></Route>
            <Route path='product' element={<Products />}></Route>
            <Route path='product/new-product' element={<NewProducts />}></Route>
            <Route path='product/edit-product/:id' element={<EditProduct />}></Route>
            <Route path='categories' element={<Categories />}>
            </Route>
            <Route path='categories/new-category' element={<NewCategories />}></Route>
            <Route path='categories/edit-category/:id' element={<EditCategory />}></Route>
            <Route path='orders' element={<Orders />}></Route>
            <Route path='orders/order-view/:id' element={<OrderDetail />}></Route>
            <Route path='customers' element={<Customers />}></Route>
            <Route path='customers/details/:id' element={<CustomersDetails />}>
            </Route>
            <Route path='overview' element={<Overview />} />
          </Route>
          {/* {privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path}
              element={
                <AdminLayout>
                  <Page />
                </AdminLayout>} />
          })}  */}
        </Routes>
      </AppContext>
    </BrowserRouter>

  );
}

export default App;
