import React, { useState, useContext } from 'react';
import { Box, Typography, Button, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import { CoWriterContext } from '../../../context';
import useDialog from '../../../hooks/useDialog';

const Save = () => {
    const { state, setState } = useContext(CoWriterContext);
        // console.log('Save:::state:enableAI::', state.enableAI);
    const [DialogComponent, openDialog] = useDialog();
    const [save, setSave] = useState(false);

    console.log('Save:::state:::', state);

    const handleClick = () => {
        setSave(!save);
    };
    
    const handleListItemClick = (event) => {
        console.log('Save:::event.target.innerText:::', event.target.innerText);

        const updatedState = {
            ...state,
            currentFile: state.files.find(file => file.name === event.target.innerText).name,
            files: state.files.map(file => {
                if (file.name === event.target.innerText) {
                    return {
                        ...file,
                        content: state.content,
                    };
                }
                return file;
            }),
        };

        localStorage.setItem('coWriterState', JSON.stringify(updatedState));
        setState(updatedState);
        setSave(false);
    };
    
    const dialogContent = (
        <Box>
            <Typography variant="h6" component="h1" color="text.darkBlue">
                Select a file where to save to
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

    const handleSave = () => {
        if (save) return;
        openDialog(dialogContent);
        setSave(true); 
    };

    return (
        <Box sx={{ mr: 1 }} onClick={handleClick}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
            >
                Save
            </Button>
            {save && <DialogComponent />}
        </Box>
    );
};

export default Save;
