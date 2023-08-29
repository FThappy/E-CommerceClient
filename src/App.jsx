

import React from 'react';
import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import ProductItem from './pages/ProductItem';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import ProductWishList from './pages/ProductWishList';
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import ProductListSearch from './pages/ProductListSearch';


const App = () => {
  const user = useSelector((state) => state.user?.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/item/:search" element={<ProductListSearch />} />
        <Route path="/product/:id" element={<ProductItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/wishlist" element={<ProductWishList />} />
      </Routes>
    </Router>
  );
}

export default App;

