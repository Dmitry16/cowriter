// Footer component using MUI Typography and Box components:
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from './Copyright';

const Footer = () => {
    return (
        <Box sx={{}}>
            <Copyright />
        </Box>
    );
}

export default Footer;