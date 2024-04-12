import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import About from '../pages/About';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index path="/mimas-tek/" element={<Home />} />
            {/* <Route path="/life-strategy/login" element={<Login />} /> */}
            <Route path="/mimas-tek/about" element={<About />} />
        </Routes>
    );
};

export default AppRoutes;