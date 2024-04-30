import React, { useState, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CoWriterContext } from '../../../context';
import useDialog from '../../../hooks/useDialog';

const Open = () => {
    const { state, setState } = useContext(CoWriterContext);
        // console.log('Open:::state:enableAI::', state.enableAI);
    const [DialogComponent, openDialog] = useDialog();  


    const handleOpen = () => {
        console.log('Open:::state:::', state);
        openDialog();
    };

    return (
        <Box sx={{ mr: 1 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
            >
                Open
            </Button>
            <DialogComponent />
        </Box>
    );
};

export default Open;
