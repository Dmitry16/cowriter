import React, { useState, useContext } from 'react';
import { Box, Typography, Button, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import { CoWriterContext } from '../../../context';
import useDialog from '../../../hooks/useDialog';

const CompletionsHistory = () => {
    const { state, setState } = useContext(CoWriterContext);
    
    // console.log('CompletionsHistory:::state:::', state);

    const [DialogComponent, openDialog] = useDialog();
    const [open, setOpen] = useState(false);

    // console.log('CompletionsHistory:::open:::', open);

    const handleClick = () => {
        setOpen(!open);
    };
    
    const handleListItemClick = (event) => {
        setState({
            ...state,
            content: state.content + ' ' + state.completionsHistory.find(completion => completion === event.target.innerText),
        });
        setOpen(false);
    };
    
    const dialogContent = (
        <Box>
            {/* <Typography variant="h6" component="h1" color="text.darkBlue">
                Select a file to open
            </Typography> */}
           <List>
                {state.completionsHistory.map((completion, index) => (
                    <ListItemButton key={index} onClick={handleListItemClick}>
                        <ListItem>
                            <ListItemText primary={completion} />
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
                Completions History
            </Button>
            {open && <DialogComponent />}
        </Box>
    );
};

export default CompletionsHistory;
