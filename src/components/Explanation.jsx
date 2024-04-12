import React from 'react';
import { Box, Stack, Typography, List, ListItem, ListItemText, ListItemButton,
    Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import useDialog from '../hooks/useDialog';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.darkBlue,
}));

const Explanation = () => {
    const [DialogComponent, openDialog] = useDialog();

    return (
        <Box sx={{ mx: 8 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                >
                    <Typography variant="subtitle1" component="h1" color="text.darkBlue">
                        To create a Life Strategy, you need to have clear understanding of what life do you want. For that we propose you to answer the following questions:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense>
                        <StyledListItem>
                            <ListItemButton onClick={() => openDialog({
                                content: 'A great life is one that is lived in accordance with your values, purpose, vision, and that is balanced across all life domains.',
                            })}>
                                <ListItemText primary="How do I define a great life?"/>
                            </ListItemButton>
                        </StyledListItem>
                        <StyledListItem>
                            <ListItemButton onClick={() => openDialog({
                                content: 'Life domains are areas of life that are important to you and that you want to improve.',
                            })}>
                                <ListItemText primary="What is life domain?"/>
                            </ListItemButton>
                        </StyledListItem>
                        <StyledListItem>
                        <ListItemButton onClick={() => openDialog({
                                content: 'Life purpose is a statement about who you are, what you do, and the impact you want to have on the world.',
                            })}>
                                <ListItemText primary="What is life purpose?"/>
                            </ListItemButton>
                        </StyledListItem>
                        <StyledListItem>
                        <ListItemButton onClick={() => openDialog({
                                content: 'Life vision is a statement about what you want to achieve in life and how you want to live your life.',
                            })}>
                                <ListItemText primary="What is life vision?"/>
                            </ListItemButton>
                        </StyledListItem>
                        <StyledListItem>
                        <ListItemButton onClick={() => openDialog({
                                content: 'Life portfolio is a set of choices and actions that enables a person to achieve the best possible outcomes in life.',
                            })}>
                                <ListItemText primary="What is life portfolio?"/>
                            </ListItemButton>
                        </StyledListItem>
                        <StyledListItem>
                        <ListItemButton onClick={() => openDialog({
                                content: 'Life portfolio can be assessed by evaluating the current state of your life and comparing it to your life vision.',
                            })}>
                                <ListItemText primary="How do I assess my life portfolio?"/>
                            </ListItemButton>
                        </StyledListItem>
                        <StyledListItem>
                        <ListItemButton onClick={() => openDialog({
                                content: 'From best practises and benchmarks one can learn what choices and actions are most likely to lead to the best possible outcomes in life.',
                            })}>
                                <ListItemText primary="What can I learn from best practises and benchmarks?"/>
                            </ListItemButton>
                        </StyledListItem>
                        <StyledListItem>
                        <ListItemButton onClick={() => openDialog({
                                content: 'Successful and sustained life change can be ensured by making a commitment to change, developing a plan for change, and executing the plan.',
                            })}>
                                <ListItemText primary="How can I ensure successful, sustained life change?"/>
                            </ListItemButton>
                        </StyledListItem>
                    </List>
                    <DialogComponent />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default Explanation;
