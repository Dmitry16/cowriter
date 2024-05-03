import React, { useState, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CoWriterContext } from '../../../context';
import useDialog from '../../../hooks/useDialog';

const Save = () => {
    const { state, setState } = useContext(CoWriterContext);
        // console.log('Save:::state:enableAI::', state.enableAI);
    const [DialogComponent, openDialog] = useDialog(); 


    const handleSave = () => {
        console.log('Save:::state:::', state);
        openDialog();
    };

    return (
        <Box sx={{ mr: 1 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
            >
                Save
            </Button>
            <DialogComponent />
        </Box>
    );
};

export default Save;
