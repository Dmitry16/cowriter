import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditorControls from '../components/editor/controls/EditorControls';
import Editor from '../components/editor/Editor';
import Completions from '../components/Completions';
import Save from '../components/editor/controls/Save';
import Open from '../components/editor/controls/Open';
import CompletionsHistory from '../components/editor/controls/CompletionsHistory';
import NewFile from '../components/editor/controls/NewFile';

const Home = () => {
    return (
        <Box sx={{}}>
            <EditorControls />
            <Completions />
            <Editor />
            <Box sx={{ m: 1, display: 'flex', justifyContent: 'right' }}>
                <NewFile />
                <Save />
                <Open />
                <CompletionsHistory />
            </Box>
        </Box>
    );
};

export default Home;
