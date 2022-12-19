import { Box, styled } from "@mui/material";


export const ExpenseBox = styled(Box)(
    ({ theme: { breakpoints } }) => `
    background-color: #000000;
    width:98%;
    height: 95%;
    position: relative;
    // left: calc(50vw - 50%);
    left: 20px;
    top: calc(50vh - 48%);
    display: flex;
    flex-direction: row;
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