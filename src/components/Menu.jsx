import React from 'react';
import { Toolbar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonRouter from '../router/ButtonRouter';

const Menu = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <Toolbar sx={{}} disableGutters>
                <ButtonRouter text='Home' href={'/cowriter/'}/>
                {/* <ButtonRouter text='Login' href={'/login'}/> */}
                <ButtonRouter text='How To' href={'/cowriter/howto'}/>
                <ButtonRouter text='About' href={'/cowriter/about'}/>
            </Toolbar>
        </Box>
    );
}

export default Menu;