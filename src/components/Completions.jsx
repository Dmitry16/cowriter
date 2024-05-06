import React, { useState, useEffect, useContext } from 'react'
import { Box, Paper, Button, Stack, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useDialog from '../hooks/useDialog';
import { styled } from '@mui/material/styles';

import { CoWriterContext } from '../context'


const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.darkBlue,
    [`:hover`]: {
        backgroundColor: theme.palette.primary.light,
        color: 'white',
    },
}));

const Completions = () => {
    // const [DialogComponent, openDialog] = useDialog();
    const [openDialogComponent, setOpenDialogComponent] = useState(false);
    const { state, setState } = useContext(CoWriterContext);
    const { currentFile: currentFileName } = state;
    const currentFile = state.files.find(file => file.name === currentFileName);

    const handleClick = (event) => {
        // console.log('Completions:::state.text:::', state.completions);
        // if (openDialogComponent) {
        //     setOpenDialogComponent(false);
        //     return;
        // };

        setState({
            ...state,
            files: state.files.map(file => {
                if (file.name === currentFileName) {
                    return {
                        ...file,
                        completions: [],
                    };
                }
                return file;
            }),
            content: state.content + ' ' + event.target.innerText,
        });
    };

    const handleSave = () => {
        const updatedState = {
            ...state,
            files: state.files.map(file => {
                if (file.name === currentFileName) {
                    return {
                        ...file,
                        completionsHistory: file.completionsHistory?.length ?
                            [...file.completionsHistory, ...file.completions] : [...file.completions],
                    };
                }
                return file;
            }),
        };

        // localStorage.setItem('coWriterState', JSON.stringify(updatedState));
        setState(updatedState);
    };

    // No completions yet. Try enabling AI and write a couple of words.

    return (
            <Paper elevation={3}
                sx={{m: 2, pt: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    height: '400px', width: 'auto', overflow: 'auto',
                    position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1,
                }}
            >
                <List>
                    {currentFile?.completions?.length ? currentFile.completions.map((completion, index) => (
                        <ListItemButton key={index} onClick={handleClick}>
                            <ListItem>
                                <ListItemText primary={completion} />
                            </ListItem>
                        </ListItemButton>))
                    : null} 
                    {/* : openDialog('No completions yet. Try enabling AI and write a couple of words.')}  */}
                </List>
                {!!currentFile.completions?.length && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save all completions
                    </Button>
                )}
                {/* {openDialogComponent && <DialogComponent />} */}
            </Paper>
    );
};

export default Completions;
