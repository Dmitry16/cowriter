import React from 'react';
import { Box, Stack, Typography, List, ListItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import useDialog from '../hooks/useDialog';
import ConstructionIcon from '@mui/icons-material/Construction';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.darkBlue,
}));

const UnderConstruction = () => {
    const [DialogComponent, openDialog] = useDialog();

    return (
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ConstructionIcon color="primary" sx={{ fontSize: 100 }} />
            <Typography variant="h5" component="h1" color="text.darkBlue">
                UNDER CONSTRUCTION...
            </Typography>
        </Box>
    );
};

export default UnderConstruction;
