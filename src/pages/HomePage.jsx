import React from 'react';
import Navbar from '../components/Navbar';

import Announcenment from '../components/Announcenment';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import ProductHome from "../components/ProductHome";

import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';



const HomePage = () => {
    return (
        <div className="container">
            <Announcenment/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <ProductHome/>
            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default HomePage;
