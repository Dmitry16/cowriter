import React, { useState } from 'react';
// import { Box, Stack, Typography, List, ListItem, ListItemText, ListItemButton,
//     Accordion, AccordionSummary, AccordionDetails,
// } from '@mui/material';
import { Box, Typography, ListItem, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import useDialog from '../../hooks/useDialog';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.darkBlue,
}));

const EditorControls = () => {
    const [DialogComponent, openDialog] = useDialog();
    
    const [selectedTab, setSelectedTab] = useState('genre');
    
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
            selectedArea: value,
        });
    };

    return (
        <Box sx={{ mx: 8 }}>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab value="genre" label={setLabel('Genre')} />
                <Tab value="theme" label={setLabel('Theme')} />
                <Tab value="style" label={setLabel('Style')} />
            </Tabs>
            {/* <Paper elevation={3}> */}
                <Box sx={{ p: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="strategic-areas">Select a {selectedTab}</InputLabel>
                        <Select
                            labelId="strategic-areas"
                            id="strategic-areas"
                            value={'essay'}
                            label={`Select a ${selectedTab}`}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={'essay'}>Essay</MenuItem>
                            <MenuItem value={'story'}>Story</MenuItem>
                            <MenuItem value={'novel'}>Novel</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            {/* </Paper> */}
        </Box>
    );
};

export default EditorControls;
