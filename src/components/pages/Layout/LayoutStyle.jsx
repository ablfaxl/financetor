import React from "react";
import {
  AppBar,
  Box,
  Container,
  Typography,
  Toolbar,
  MenuItem,
  Menu,
  Button,
  Avatar,
  styled,
  Divider,
  TextField,
  Stack,
} from "@mui/material";
import { breakpoints } from "@mui/system";

export const BoxLayout = styled(Box)(
  ({ theme: { breakpoints } }) => `
  background-color: #000000;
  height: 100vh;
  color: white;
  width: 30%;
  padding-left: 15px;
  
  ${breakpoints.down("lg")}{
      // display: none;
      background-color: gray;
      height: 80px;
      width:98.1%;      

  }
  ${breakpoints.down("md")}{
    // display: none;
    height: 80px;
    width:97%;      
    background-color: blue;
  }
  ${breakpoints.down("sm")}{
      height: 80px;
      width:97%;      
      background-color: red;
      
    }
  
  `
);
export const IconBox = styled(Box)(
  ({ theme: { breakpoints } }) => `
  display: flex;
  justify-content:left;
  align-items: left;
  width: 10rem;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #a9a9a9;
  ${breakpoints.down("lg")}{
    border: 2px solid black;
      display: none;   

  }
  
  `
);
export const BoxContainer = styled(Box)(
  ({ theme: { breakpoints } }) => `
  background-color: #202020;
  position: absolute;
  height:100vh;
  width: 80%;
  right: 0;
  // left: 380px;
  top: 0;
  ${breakpoints.down("lg")}{
      display: none;
      opacity: 4%;
      border: 2px solid black;
      color: blue;
      
  }
  ${breakpoints.down("sm")}{
      height: 40%;
      width: 80%;
      background-color: red;
      border-radius: 5x;
      
    }
  
  `
);
export const ModalBox = styled(Box)(
  ({ theme: { breakpoints } }) => ` 
  background-color: #c6c6c6;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
    top: 50%;
    // color: white;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 20%;
    border: 2px solid #000;
    box-shadow: 24;
    padding: 10px;
    // ${breakpoints.down("sm")}{
    //   background-color: red;
    // }
    ${breakpoints.down("lg")}{
      width:30%;
      height:40%;
    align-items: center;
    flex-direction: column;
    }
  `
);


export const ProfileStack = styled(Stack)(
  ({ theme: { breakpoints } }) => `
  display: flex;
  flex-direction: row;
  gap: 2;
  justify-content: space-between;
  align-items: center;
  ${breakpoints.down("lg")}{
    display: flex;
    // width: 30%;
    flex-direction: column;
  }
  
  `
);



export const LayoutDivider = styled(Divider)(
  ({ theme: { breakpoints } }) => `
  background-color: #7B7B7B;
  width: 10rem;
  // margin-top: 100px;
  ${breakpoints.down("lg")}{
    // diplay: none;
    background-color: blue;
    height: 1rem;
  }  
  ${breakpoints.down("sm")}{
    // display: none;
    background-color: green;
  }
  `
);





export const ModalInput = styled(
  TextField,
  // OutlinedInput
)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& text": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
});