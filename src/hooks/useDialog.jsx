import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useDialog = () => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    
    const handleClose = () => {
        setOpen(false);
    };

    const openDialog = ({ content }) => {
        setContent(content);
        setOpen(true);
    };

    const DialogComponent = () => {
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                maxWidth='md'
                area-aria-describedby='alert-dialog-slide-description'
            >
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'text.darkBlue',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h5" component="h1" color="text.darkBlue" sx={{m:2}}>
                        {content}
                    </Typography>
                </DialogContent>
            </Dialog>
        );
    };

    return [DialogComponent, openDialog];
}

export default useDialog;
