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
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={`${status}`} sx={{ width: '100%' }}>
        {`${text}`}
        </Alert>  
        {/* <Alert onClose={handleClose} severity={`${succes}`} sx={{ width: '100%' }}>
        Your registration was successful ✔
        </Alert> */}
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert> */}
      {/* <Alert severity={`${status}`}>This is a warning message!</Alert> */}
      {/* <Alert severity="info">This is an information message!</Alert> */}
      {/* <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}