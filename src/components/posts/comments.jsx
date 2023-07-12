import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';

const Comments = (props) => {
    const { open, handleClose, postId } = props
    
    //const { open } = props
    // const { handleClose } = props
    // const { postId } = props
    
    
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle >Subscribe</DialogTitle>
                <DialogContent dividers>
                    Post ID is {postId}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Comments
