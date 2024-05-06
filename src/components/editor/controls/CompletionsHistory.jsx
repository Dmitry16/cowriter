import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, Button, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import { CoWriterContext } from '../../../context';
import useDialog from '../../../hooks/useDialog';
import { set } from 'lodash';

const CompletionsHistory = () => {
    const { state, setState } = useContext(CoWriterContext);
    const { currentFile: currentFileName } = state;
    const currentFile = state.files.find(file => file.name === currentFileName);

    const [DialogComponent, openDialog] = useDialog();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    
    const handleListItemClick = (event) => {
        setState({
            ...state,
            content: state.content + ' ' + currentFile.completionsHistory.find(completion => completion === event.target.innerText),
        });
        setOpen(false);
    };
    
    const dialogContent = (
        <Box>
           <List>
                {currentFile?.completionsHistory?.length ? currentFile.completionsHistory.map((completion, index) => (
                    <ListItemButton key={index} onClick={handleListItemClick}>
                        <ListItem>
                            <ListItemText primary={completion} />
                        </ListItem>
                    </ListItemButton>
                ))
                : (<ListItem>
                        <ListItemText primary="No completions history for this file yet." />
                    </ListItem>
                )}
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
                Completions History
            </Button>
            {open && <DialogComponent />}
        </Box>
    );
};

export default CompletionsHistory;
