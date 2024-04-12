import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import About from '../pages/About';
import HowTo from '../pages/HowTo';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index path="/cowriter/" element={<Home />} />
            {/* <Route path="/life-strategy/login" element={<Login />} /> */}
            <Route path="/cowriter/howto" element={<HowTo />} />
            <Route path="/cowriter/about" element={<About />} />
        </Routes>
    );
};

export default AppRoutes;