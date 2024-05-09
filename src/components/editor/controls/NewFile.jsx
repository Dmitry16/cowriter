import React, { useState, useContext } from 'react';
import { Box, Typography, Button, TextField, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import { CoWriterContext } from '../../../context';
import useDialog from '../../../hooks/useDialog';
import { editorDefaults } from '../../../constants/editorDefaults';

const NewFile = () => {
    const { state, setState } = useContext(CoWriterContext);
        // console.log('NewFile:::state:enableAI::', state.enableAI);
    const [DialogComponent, openDialog] = useDialog();
    const [newFile, setNewFile] = useState(false);

    // console.log('NewFile:::editorDefaults:::', editorDefaults);

    const handleClick = () => {
        // setNewFile(!newFile);
    };

    const handleCreate = () => {
        const newFileName = document.getElementById('new-file').value;
        const updatedState = {
            ...state,
            files: [...state.files, {
                name: newFileName,
                content: editorDefaults.content,
                completions: [],
                completionsHistory: [],
                genre: editorDefaults.file.genre,
                language: editorDefaults.file.language,
                theme: editorDefaults.file.theme,
                style: editorDefaults.file.style,
                tab: editorDefaults.file.tab,
            }],
            currentFile: newFileName,
        };

        localStorage.setItem('coWriterState', JSON.stringify(updatedState));
        setState(updatedState);
        setNewFile(false);
    };
    
    // const handleListItemClick = (event) => {
    //     console.log('NewFile:::event.target.innerText:::', event.target.innerText);

    //     const updatedState = {
    //         ...state,
    //         currentFile: state.files.find(file => file.name === event.target.innerText).name,
    //         files: state.files.map(file => {
    //             if (file.name === event.target.innerText) {
    //                 return {
    //                     ...file,
    //                     content: state.content,
    //                 };
    //             }
    //             return file;
    //         }),
    //     };

    //     localStorage.setItem('coWriterState', JSON.stringify(updatedState));
    //     setState(updatedState);
    //     setNewFile(false);
    // };
    
    const dialogContent = (
        <Box>
            {/* <Typography variant="h6" component="h1" color="text.darkBlue">
                Type a new file name
            </Typography> */}
            <TextField
                id="new-file"
                label="New File Name"
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreate}
            >
                Create
            </Button>
        </Box>
    );

    const handleNewFile = () => {
        if (newFile) return;
        openDialog(dialogContent);
        setNewFile(true); 
    };

    return (
        <Box sx={{ mr: 1 }} onClick={handleClick}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleNewFile}
            >
                New File
            </Button>
            {newFile && <DialogComponent />}
        </Box>
    );
};

export default NewFile;
