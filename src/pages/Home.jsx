import React from 'react';
import { Box, Stack, Typography, List, ListItem, ListItemText, ListItemButton,
    Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import useDialog from '../hooks/useDialog';
import ConstructionIcon from '@mui/icons-material/Construction';
import UnderConstruction from '../components/UnderConstruction';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.darkBlue,
}));

const Home = () => {
    const [DialogComponent, openDialog] = useDialog();

    return (
        <UnderConstruction />
    );
};

export default Home;
