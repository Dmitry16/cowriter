import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const About = () => {
    return (
        <Box sx={{ mx: 8 }}>
            <Stack spacing={2}>
                <Typography variant="h5" component="h1" color="text.darkBlue">
                    
                </Typography>
                <Typography paragraph variant="body1" color="text.darkBlue">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                    Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
                    litora torquent per conubia nostra, per inceptos himenaeos.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                </Typography>
            </Stack>
        </Box>
    );
};

export default About;
