import React, { useState, useEffect, useContext } from 'react'
import { Box, Paper, Stack, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
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
        console.log('Completions:::state.text:::', state.text);
        setState({
            ...state,
            completions: [],
            text: state.text + event.target.innerText,
        });
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
            </Paper>
    );
};

export default Completions;
