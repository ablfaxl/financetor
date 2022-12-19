import { Box, styled, TableRow, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';




export const TagBox = styled(Box)(
    ({ theme: { breakpoints } }) => `
    background-color: #000000;
    width:90%;
    height: 80%;
    position: relative;
    left: calc(50vw - 55%);
    top: calc(50vh - 40%);
    ${breakpoints.down("lg")}{
       
        display: none;
        background-color: red;
        
    }
    ${breakpoints.down("sm")}{
        height: 40%;
        width: 80%;
        background-color: red;
        border-radius: 5x;
        
      }
    
    `
  );


  // top: calc(60% - 70%);
  export const LeftBox = styled(Box)(
    ({ theme: { breakpoints } }) => `
    background-color: #212121 ;
    
    width:30%;
    height:80%;
    margin-left: 20px;
    position: relative;
    bottom: 486px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${breakpoints.down("lg")}{
       
        display: none;
        background-color: red;
        
    }
    ${breakpoints.down("sm")}{
        height: 40%;
        width: 80%;
        background-color: red;
        border-radius: 5x;
        
      }
    
    `
  );

  export const RightBox = styled(Box)(
    ({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #808080;
    position: relative;
    width: 60%;
    right: 25px;
    top: 15px;
    margin-left:  auto;
    ${breakpoints.down("lg")}{
       
        display: none;
        background-color: red;
        
    }
    ${breakpoints.down("sm")}{
        height: 40%;
        width: 80%;
        background-color: red;
        border-radius: 5x;
        
      }
    
    `
  );

 
 export const StyledTextField = styled(
    TextField,  
    // OutlinedInput
  )({
    // width:"80%",
    "& label.Mui-focused": {
      color: "black",
    },
    "& label": {
      color: "black",
    },
    "& text": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  });

  export const EditInput = styled(
    TextField,
    // OutlinedInput
  )({
    width:"40%",
    "& label.Mui-focused": {
      color: "black",
    },
    "& label": {
      color: "black",
    },
    "& text": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  });

  // table
  export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  export const deleteModal = styled(Box)(
    ({ theme: { breakpoints } }) => `
    background-color: red;
    width: 600px;
    height: 600px;
    position: fixed;
    top: calc(50vh - 200px);
    left: calc(50vw - 300px);
    z-index: 50;
    border-radius: 12px;
    font-size: 30px;
    color: #fff;
    padding: 16px;

    // ${breakpoints.down("lg")}{
       
        // display: none;
        // background-color: red;
        
    // }
    // ${breakpoints.down("sm")}{
        // height: 40%;
        // width: 80%;
        // background-color: red;
        // border-radius: 5x;
        
      // }
    
    `
  );