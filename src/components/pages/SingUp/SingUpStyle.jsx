import React from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
  styled,
  Card,
  Stack,
  Divider,
} from "@mui/material";
export const StyledContainer = styled(Container)(
  ({ theme: { breakpoints } }) => `
  display:flex;
  justify-content:center;
  background-color: #434343;
  align-items: center;
  flex-direction: column;
 margin-left: 260px;
  color:white;
  width: 35%;
  height: 100%;

  ${breakpoints.down("lg")}{
      display: none;
      background-color: red;
      height: 100vh;
      width: 80%;
      
  }
  
  `
);
export const StyledBox = styled(Box)(
    ({ theme: { breakpoints } }) => `
    display:flex;
    justify-content:center;
    align-items: center;
    background-color: #202020;
    color:white;
    height: 100vh;
    width: 100%;
  
    ${breakpoints.down("lg")}{
        background-color: gray;
    }
    ${breakpoints.down("sm")}{
        display:flex;
        height: 120%;
        justify-content:center;
        flex-direction: column;  
        align-items: center;
        background-color: #202020;
        position: absolute;
        bottom: 0px;
    }
    
    `
  );

  export const MobileBox = styled(Box)(
    ({ theme: { breakpoints } }) => `
    display: none;
    ${breakpoints.down("sm")}{
        background-color: #202020;
    }
    
    `
  );


  export const StyledCard = styled(Card)(
    ({ theme: { breakpoints } }) => `
    display:flex;
    justify-content:center;
    align-items: center;
    color:white;
    background-color: #434343;
    height: 500px;
    width: 650px;
    margin-left: 359px;
    cursor: default;

  
    ${breakpoints.down("lg")}{
        display: none;

    }
    
    `
  );

  export const StyledInput = styled(TextField)(
    ({ theme: { breakpoints } }) => `
    width: 300px;
    padding: 2;
    border: none;
    outline: none;
    display:flex;
    justify-content:center;
    align-items: center;
    background-color: transparent;
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
  export const InputBox = styled(Box)(
    ({ theme: { breakpoints } }) => `
    padding-top: 30px;
    width: 300px;
    ${breakpoints.down("lg")}{
        color: red;
        display: none;
    }
    
    
    `
  );
  export const StyledButton = styled(Button)(
    ({ theme: { breakpoints } }) => `
    width: 75%;
    padding: 2;
    background-color:#767676;
    text-align: center;
    margin-left: 40px;
    ${breakpoints.down("lg")}{
        color: white;
        display: none;

    }
    ${breakpoints.down("md")}{
        display:flex;
        justify-content:center;
        flex-direction: column;  
        align-items: center;
        background-color: #89b9ff;
        width:80%;
        margin-right: 38.9px;

        }
    ${breakpoints.down("sm")}{
        display:flex;
        justify-content:center;
        flex-direction: column;  
        align-items: center;
        background-color: #89b9ff;
        width:80%;
        margin-right: 38.9px;

        }
    
    `
  );

  export const IconBox = styled(Box)(
    ({ theme: { breakpoints } }) => `
    display: flex;
    justify-content:center;
    align-items: center;
    width: 60px;
    height: 50px;
    border-radius: 3px;
    border: 2px solid #a9a9a9;
    ${breakpoints.down("lg")}{
        color: white;
        display: none;

    }
    
    `
  );


export const StyledStack = styled(Stack)(
    ({ theme: { breakpoints } }) => `
    display: flex;
    justify-content:center;
    flex-direction: row;
    align-items: center;
   
    ${breakpoints.down("lg")}{
        color: orange;
        display: none;

    }
    
    `
  );
  
  export const StyledDivider = styled(Divider)(
    ({ theme: { breakpoints } }) => `
    background-color: white;
    width: 100px;
    height: 0.5px;
    margin:5px;
    ${breakpoints.down("lg")}{
        color: orange;
        background-color: orange;
        display: none;   
    }
    ${breakpoints.down("sm")}{
        width: 100px;
        height: 0.5px;
        background-color: white;
    }
    
    `
  );
  


