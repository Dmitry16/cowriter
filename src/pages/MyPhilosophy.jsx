import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const MyPhilosophy = () => {
    return (
        <Box sx={{ mx: 8 }}>
            <Stack spacing={0}>
                <Typography variant="h4" component="h1" color="text.darkBlue">
                    Dmytro Davydov
                </Typography>
                <Typography variant="h2" component="h1" color="text.darkBlue">
                    Web Developer
                </Typography>
            </Stack>
        </Box>
    );
};

export default MyPhilosophy;
