import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertModal({handleClose, open, status, text }) {
  // console.log("is running")
  

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={`${status}`} sx={{ width: '100%' }}>
        {`${text}`}
        </Alert>  
       
      </Snackbar>
    </Stack>
  );
}