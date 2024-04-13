import React from 'react';
import { Box, Stack, Typography, List, ListItem, ListItemText, ListItemButton,
    Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import useDialog from '../../hooks/useDialog';
// import ConstructionIcon from '@mui/icons-material/Construction';
// import UnderConstruction from '../components/UnderConstruction';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.darkBlue,
}));

const EditorControls = () => {
    const [DialogComponent, openDialog] = useDialog();

    return (
        <Box sx={{ mx: 8 }}>
            <Stack spacing={2}>
                <Typography variant="h4" component="h1" color="text.darkBlue">
                    Let's write a story together!!!
                </Typography>
                <Typography variant="h5" component="h1" color="text.darkBlue">
                    Select a genre
                </Typography>
                <Typography variant="h5" component="h1" color="text.darkBlue">
                    Select a theme
                </Typography>
                <Typography variant="h5" component="h1" color="text.darkBlue">
                    Select a style
                </Typography>
            </Stack>
        </Box>
    );
};

export default EditorControls;
