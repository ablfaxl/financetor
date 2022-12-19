import React, { useState, useEffect } from "react";
import { Box, Container, Button, TextField, Typography, Card, CardActionArea, CardMedia, CardContent, Divider, Stack } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";
import AlertModal from '../Alert'
import { Link, useNavigate } from "react-router-dom";
//styled 
import { StyledContainer } from "./SingUpStyle";
import { StyledBox } from "./SingUpStyle";
import { StyledCard } from "./SingUpStyle";
import { StyledInput } from "./SingUpStyle";
import { InputBox } from "./SingUpStyle";
import { StyledButton } from "./SingUpStyle";
import { IconBox } from "./SingUpStyle";
import { StyledStack } from "./SingUpStyle";
import { StyledDivider } from "./SingUpStyle";
import { MobileBox } from "./SingUpStyle";
// icon
import {BsFacebook} from 'react-icons/bs';
import {FcGoogle} from 'react-icons/fc'
import {AiFillApple} from 'react-icons/ai'
import { positions, width } from "@mui/system";

//




// requset to backend
const SINGUP = gql`
mutation Signup($name: String!, $username: String!, $password: String!) {
  signup(name: $name, username: $username, password: $password) {
    token
  }
}
`;

function SingUp() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mutateFunction] = useMutation(SINGUP)
    const navigate = useNavigate()
    const cookies = new Cookies();
    const token = cookies.get("token");

    //
    const [open, setOpen] = useState(false);
    const [status,setStatus]=useState("")
    const [text, setText] = useState("")




    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

  const handleClick = (data, txt) => {
    setStatus(data)
    setText(txt)
    setOpen(true);
    }
    
 



    const AddUser = async () => {
      try {
          if (!name || !username || !password)  {handleClick("warning", "please fill all input")} 
          const newUser = await mutateFunction({
            variables: {  
            "name": name,
            "username": username,
            "password": password,
          },
          });
          // console.log(newUser.data.singup);
          cookies.set('token',newUser.data.signup.token);
          {
            handleClick("success", "Your registration was successful")
            console.log('data', newUser.data.signup.token)
          } 
          window.location.assign('http://localhost:3000/dashboard')
        } catch (error) {
          handleClick("error", "This username has already been used")
          console.log(error); 
        }
      };

      useEffect(()=>{
        if(token){
          navigate('/dashboard')
        }else{
          navigate('/')
  
        }
      },[])


  return (
    <>
        
        <StyledBox>
        {/* Mobile */}
        <Box
        sx={{
          display:{sm: "flex", lg:"none", md:"none", xl:"none"},
          height: '80%',
          justifyContent:"center",
          flexDirection:'column',
          alignItems:"center",
          position:'absolute',
          bottom:0 ,
        }}
        > 
          <Typography align="center" variant="h5">
            SingUp
          </Typography>
          <br />
          <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            width:'100%',
          }}>
          <TextField 
           value={name}
           onChange={(e) => setName(e.target.value)}
          variant='filled'
          sx={{width:'140%',bgcolor:'#e4e4e4',borderRadius:'5px',height:'55px'}}
          placeholder="name" />
          
          <br />
          <TextField 
           value={username}
           onChange={(e) => setUsername(e.target.value)}
          variant='filled'
          sx={{width:'140%',backgroundColor:'#e4e4e4',borderRadius:'5px',height:'55px'}}
          placeholder="username" />
          <br />
          <TextField
           value={password}
           onChange={(e) => setPassword(e.target.value)}
          variant='filled'
          type='password'
          sx={{width:'140%',bgcolor:'#e4e4e4',borderRadius:'5px',height:'55px'}}
          placeholder="password" />
          <br/>
          <Button sx={{
           display:"flex",
           justifyContent:'center',
           flexDirection:'column',
           alignItems:'center',
           backgroundColor:'#89b9ff',
           width: "80%",
          }}
          onClick={()=>AddUser()}
          >sing up</Button>
          </Box>
          <br />
          <Stack display={"flex"} flexDirection={"row"}>
          <Divider
          sx={{bgcolor:'white', width:"100px",height:'0.5px', marginRight:'8px'}}
          />
         <Typography
         sx={{fontSize:'14px',position:'relative',bottom:'10px', color:'#e4e4e4'}}>
           or continue with</Typography>
          <Divider
          sx={{bgcolor:'white', width:"100px",height:'0.5px', marginLeft:"8px"}}
          
          />
          </Stack>
          <br/>
          <Stack   display={'flex'} alignItems='center' flexDirection={'row'} justifyContent={"space-between"}>
          <Box sx={{
            display:'flex',
            justifyContent:"center",
            alignItems:'center',
            border:'2px solid #a9a9a9',
            height:'50px',
            width:'50px'
          }}>

          <BsFacebook size={28.5}  style={{color:'#1876f0'}} />
          </Box>
          <Box sx={{
            display:'flex',
            justifyContent:"center",
            alignItems:'center',
            border:'2px solid #a9a9a9',
            height:'50px',
            width:'50px'
          }}>
          <FcGoogle size={30} />
          </Box>
          <Box sx={{
            display:'flex',
            justifyContent:"center",
            alignItems:'center',
            border:'2px solid #a9a9a9',
            height:'50px',
            width:'50px'
          }}>
          <AiFillApple size={30} />
          </Box>
          </Stack>

          <br />

          <Typography sx={{color:'#e4e4e4'}}>
            Do you have an account?
            <Link to='/login' style={{color:'#1876f0', textDecoration:"none"}}>Click Here</Link>
          </Typography>
        </Box>
        {/* Mobile */}
        <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://images.unsplash.com/photo-1512358958014-b651a7ee1773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Welcome to Financtor 
          </Typography>
          <Typography variant="body2">
            This site helps you manage your money
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
      <StyledContainer>
          <Typography variant="h5">
            SingUp
          </Typography>

          {/* form */}
          <form>
            <InputBox>
              <StyledInput  
                variant='filled'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                // variant="standard"
              />
              <br />
              <StyledInput
                variant='filled'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
              <br />

              <StyledInput
                variant='filled'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                type="password"
              />
              <br />
    
            </InputBox>
            <br />
            <StyledButton
              onClick={()=>AddUser()}
              variant="contained"
            >
              sing up
            </StyledButton>
          </form>
          <br />

          <StyledStack>
         
          <StyledDivider />

         <Typography
         sx={{fontSize:'14px',position:'relative',bottom:'5px', color:'#e4e4e4'}}>
           or continue with</Typography>

         <StyledDivider />
          </StyledStack>
         <br />
          <Stack width={'70%'} display={'flex'} alignItems='center' flexDirection={'row'} justifyContent={"space-between"}> 
           <IconBox>
          <BsFacebook size={29} style={{color:'#1876f0'}} />
            </IconBox>
            <IconBox>
          <FcGoogle size={30} />
            </IconBox>
            <IconBox>
          <AiFillApple size={30} />
            </IconBox>
          </Stack>

          <br />

            <Typography sx={{color:'#e4e4e4'}}>
            Do you have an account?
            <Link to='/login' style={{color:'#1876f0', textDecoration:"none"}}>Click Here</Link>
            </Typography>
      </StyledContainer>
      
        </StyledBox>



      <AlertModal handleClose={handleClose} open={open}  status={status} text={text} />
    </>
  );
}

export default SingUp;
// az use hook form estefade
