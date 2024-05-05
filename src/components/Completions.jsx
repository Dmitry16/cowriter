import React, { useState, useEffect, useContext } from 'react'
import { Box, Paper, Button, Stack, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
    const { state, setState } = useContext(CoWriterContext);

    const handleClick = (event) => {
        // console.log('Completions:::state.text:::', state.completions);
        setState({
            ...state,
            completions: [],
            content: state.content + ' ' + event.target.innerText,
        });
    };

    const handleSave = () => {
        const updatedState = {
            ...state,
            completionsHistory: state?.completionsHistory.length ?
                [...state.completionsHistory, ...state.completions] : [...state.completions],
        };

        // localStorage.setItem('coWriterState', JSON.stringify(updatedState));
        setState(updatedState);
    };

    return (
            <Paper elevation={3}
                sx={{m: 2, pt: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    height: '400px', width: 'auto', overflow: 'auto',
                    position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1,
                }}
            >
                <List>
                    {state.completions.map((completion, index) => (
                        <StyledListItem key={index} onClick={handleClick}>
                            <ListItemText primary={completion} />
                        </StyledListItem>
                    ))}
                </List>
                {state.completions.length && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save all completions
                    </Button>
                )}
            </Paper>
    );
};

export default Completions;
