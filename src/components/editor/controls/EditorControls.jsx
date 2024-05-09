import React, { useState, useContext } from 'react';
import { Box, Typography, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';
import { CoWriterContext } from '../../../context';

const EditorControls = () => {
    const { state, setState } = useContext(CoWriterContext);
    console.log('EditorControls:::state::', state);

    const currentFile = state.files?.find(file => file.name === state.currentFile); 

    // console.log('EditorControls:::state::', state);

    const [selectedTab, setSelectedTab] = useState('genres');
    
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const setLabel = label => (
        <Typography variant="caption" component="h1" color="text.darkBlue">
            {label}
        </Typography>
    );

    const handleSelectChange = ({ target: { value }}) => {
        const updatedState = {
            ...state,
            files: state.files.map(file => {
                if (file.name === currentFile.name) {
                    return {
                        ...file,
                        // [selectedTab]: value,
                        genre: selectedTab === 'genres' ? value : file.genre,
                        theme: selectedTab === 'themes' ? value : file.theme,
                        style: selectedTab === 'styles' ? value : file.style,
                    };
                }
                return file;
            }),
        };
        localStorage.setItem('coWriterState', JSON.stringify(updatedState)); 
        setState(updatedState);
    };

    return (
        <Box sx={{ mx: 8 }}>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab value="genres" label={setLabel('Genre')} />
                    <Tab value="themes" label={setLabel('Theme')} />
                    <Tab value="styles" label={setLabel('Style')} />
                </Tabs>
                <Box sx={{ mt: 2, display: 'flex' }}>
                    <Typography sx={{pt:1}} variant="body1" component="h1" color="text.darkBlue">
                        Enable AI Completions
                    </Typography>
                    <Switch
                        checked={state.enableAI}
                        onChange={() => setState({ ...state, enableAI: !state.enableAI })}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
            </Box>
            <Box sx={{ p: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="strategic-areas">Select a {selectedTab}</InputLabel>
                    <Select
                        labelId={`select-${selectedTab}`}
                        id={`select-${selectedTab}`}
                        value={selectedTab === 'genres' ? currentFile.genre : selectedTab === 'themes' ? currentFile.theme : currentFile.style}
                        label={`Select a ${selectedTab}`}
                        onChange={handleSelectChange}
                    >
                        {state[selectedTab]?.map(val => (
                            <MenuItem key={selectedTab+val} value={val}>{val}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default EditorControls;
