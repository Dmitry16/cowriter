import React, { useState, useContext } from 'react';
// import { Box, Stack, Typography, List, ListItem, ListItemText, ListItemButton,
//     Accordion, AccordionSummary, AccordionDetails,
// } from '@mui/material';
import { Box, Typography, ListItem, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import useDialog from '../../hooks/useDialog';
import { CoWriterContext } from '../../context';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.darkBlue,
}));

const EditorControls = () => {
    const { state, setState } = useContext(CoWriterContext);
    // const [DialogComponent, openDialog] = useDialog();

        console.log('EditorControls:::state:enableAI::', state.enableAI);

    
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
        setState({
            ...state,
            selectedGenre: selectedTab === 'genres' ? value : state.selectedGenre,
            selectedTheme: selectedTab === 'themes' ? value : state.selectedTheme,
            selectedStyle: selectedTab === 'styles' ? value : state.selectedStyle,
        });
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
                        Enable AI
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
                        value={selectedTab === 'genres' ? state.selectedGenre : selectedTab === 'themes' ? state.selectedTheme : state.selectedStyle}
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
