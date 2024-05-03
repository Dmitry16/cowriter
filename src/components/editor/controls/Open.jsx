import React, { useState, useContext } from 'react';
import { Box, Typography, Button, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import { CoWriterContext } from '../../../context';
import useDialog from '../../../hooks/useDialog';

const Open = () => {
    const { state, setState } = useContext(CoWriterContext);
    
    // console.log('Open:::state:::', state);

    const [DialogComponent, openDialog] = useDialog();
    const [open, setOpen] = useState(false);

    // console.log('Open:::open:::', open);

    const handleClick = () => {
        setOpen(!open);
    };
    
    const handleListItemClick = (event) => {
        setState({
            ...state,
            currentFile: state.files.find(file => file.name === event.target.innerText).name,
        });
        setOpen(false);
    };
    
    const dialogContent = (
        <Box>
            <Typography variant="h6" component="h1" color="text.darkBlue">
                Select a file to open
            </Typography>
           <List>
                {state.files.map((file, index) => (
                    <ListItemButton key={index} onClick={handleListItemClick}>
                        <ListItem>
                            <ListItemText primary={file.name} />
                        </ListItem>
                    </ListItemButton>
                ))}
           </List>
        </Box>
    );

    const handleOpen = () => {
        if (open) return;
        openDialog(dialogContent);
        setOpen(true); 
    };

    return (
        <Box sx={{ mr: 1 }} onClick={handleClick}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
            >
                Open
            </Button>
            {open && <DialogComponent />}
        </Box>
    );
};

export default Open;
