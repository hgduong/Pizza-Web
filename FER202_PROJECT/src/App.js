// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { ProductProvider } from './Context/ProductContext';
import { CartProvider } from './Context/CartContext';
// import { AdminProvider } from './Context/AdminContext';
import Home from './Pages/Home';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHeader from './Components/UserHeader';
import GuestHeader from './Components/GuestHeader';
import RegisterForm from './Pages/RegisterForm';
import Profile from './Pages/Profile';
import AdminPage from './Components/AdminPage';
import UserManagement from './Pages/UserManagement';
import ProductManagement from './Pages/ProductManagement';
import AdminNavbar from './Components/AdminNavbar';
import Cart from './Components/Cart';
import VoucherPage from './Components/VoucherPage';
import { VoucherProvider } from './Context/VoucherContext';
import Invoice from './Components/Invoice';
import OrderSuccess from './Components/OrderSuccess';

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
      <CartProvider>
        {/* <AdminProvider> */}
        <VoucherProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<GuestHeader />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/users" element={<><AdminNavbar /><UserManagement /></>} />
              <Route path="/admin/products" element={<><AdminNavbar /><ProductManagement /></>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/voucher" element={<VoucherPage/>} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
            
          </Router>
          </VoucherProvider>
          </CartProvider>
        {/* </AdminProvider> */}
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
