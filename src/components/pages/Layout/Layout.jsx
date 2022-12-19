import { Avatar, Box, Button, Divider, Menu, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "universal-cookie";

//style
import { BoxContainer, BoxLayout, LayoutDivider, ModalBox, ModalInput, ProfileStack } from "./LayoutStyle";
import { IconBox } from "./LayoutStyle";
//icno
import { FaGoogleWallet } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
import { BiTagAlt } from "react-icons/bi";
import EuroIcon from "@mui/icons-material/Euro";
import LogoutIcon from "@mui/icons-material/Logout";
//
//
const GET_ME = gql`
  query Me {
    me {
      _id
      name
      username
      img
      myTags {
        _id
        name
        color
        expenseCount
      }
      myExpenses {
        _id
        amount
        tag {
          _id
          name
          color
          expenseCount
        }
        geo {
          lat
          lon
        }
        date
      }
    }
  }
`;
const EDIT_PROFILE = gql `
mutation EditMe($name: String!, $img: Upload) {
  editMe(name: $name, img: $img) {
    status
    msg
  }
}
`
//

function Layout() {

  const cookie = new Cookies()
  const token = cookie.get("token");
  const navigate = useNavigate()
  const [mutateFunction] = useMutation(EDIT_PROFILE)
  const { data, loading, error, refetch } = useQuery(GET_ME);
  const [defaultName, setDefaultName] = useState("")
  // console.log(data.me.name)
  const [name, setName] = useState("")
  const [img, setImg] = useState("")

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  //modal
  //Menu
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);
  //Menu
  //Drawer

  //Drawer


  // console.log('token in layout',token)
   useEffect(()=>{
    if(data){
      setDefaultName(data.me.name)
    }

   },[data])



  // onclick function
  const editProfile = async () => {
    try {
        
        const edit = await mutateFunction({
          variables: 
            {
              "name": name,
              "img": img,
            },
        
        });
        // console.log(edit);
        // {
          // handleClick("success", "Your registration was successful")
          // console.log('data', edit.data)
        // }
      } catch (error) {
        console.log(error); 
      }
    };



  const signOut = () => {
    cookie.remove('token');
  };
  useEffect(()=>{
    if(!token){
      window.location.assign("/")
    }
  },[token])
  if (error) return <h3>Error!</h3>;
  if (loading) return <h3>Loading...</h3>;
  refetch()


  
  return (
    <>
      <BoxLayout>
        <Stack direction="row" p={1} pt={2}>
          <Typography align="center" variant="h4">
            Finance
          </Typography>
          <FaGoogleWallet size={30} />
        </Stack>
        <br />
        <Box
          sx={{
            display:{lg: 'flex', md:'none', sm:'none', xs:'none'},
            justifyContent: "center",
            flexDirection: "column",

            // gap: "190px",
          }}
        >
          <LayoutDivider sx={{ bgcolor: "#7B7B7B", width: "10rem" }} />
          <Stack pt={2} direction="column" spacing={"10px"}>
            <IconBox>
              <HomeIcon sx={{ width: "35px", height: "35px" }} />
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/dashboard/Home"
              >
                <Typography p={1}>Home</Typography>
              </Link>
            </IconBox>
            <IconBox>
              <BiTagAlt size={40} />
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/dashboard/Tag"
              >
                <Typography p={1}>Tag</Typography>
              </Link>
            </IconBox>
            <IconBox>
              <EuroIcon sx={{ width: "35px", height: "35px" }} />
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/dashboard/Expense"
              >
                <Typography p={1}>Expense</Typography>
              </Link>
            </IconBox>
          </Stack>

        <LayoutDivider
          sx={{ bgcolor: "#7B7B7B", width: "10rem", marginTop: "100px" }}
          />
          </Box>
        <br />
      
        <Stack
          justifyContent="space-between"
          flexDirection={"row"}
          width="100px"
          pl={2}
          sx={{cursor:'pointer'}}
        >
          <Button onClick={handleOpenModal} >
          <Avatar  src={`http://localhost:80/${data.me.img}`} sx={{ height: "40px", width: "40px",marginLeft:"10px" }} />
          <Typography align="center" p={1}>
            {/* {data.me.name} */}
            {defaultName}
          </Typography>
          </Button>
        </Stack>
        <br />
          {/* Modal */}
          <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox 
        sx={{height:"200px", height:"200px",padding:6}}
        >
        <Avatar src={`http://localhost:80/${data.me.img}`} sx={{ height: "130px", width: "130px",padding:2}} />
          <ProfileStack>
          <ModalInput
          sx={{color:'white'}}
          placeholder="name" 
          value={name}
          defaultValue={defaultName}
          onChange={(e)=>setName(e.target.value)} />
          {" "}
          <ModalInput
          type={"file"} 
          // value={img}
           onChange={(e)=>setImg(e.target.files[0])} />
          
          <Button sx={{width:'80px',height:'50px'}} color="primary" variant="contained" onClick={editProfile}>confirm</Button>
          </ProfileStack>

        </ModalBox>
      </Modal>

        {/* Modal */}
        <Link to='/login' onClick={()=>signOut()} style={{textDecoration:"none",color:"white"}} >
        <Button
          sx={{ width: "100px" }}
          variant="outlined"
          startIcon={<LogoutIcon />}
          >
          Logout
        </Button>
          </Link>
      </BoxLayout>
      {/*  */}
      {/* Mobile */}
      
      {/* Mobile */}
      <BoxContainer>
        <Outlet />
      </BoxContainer>
    </>
  );
}

export default Layout;
// chgone bayad item haro b chap bzaram?
// chjori size sho ro halat mobile hrof bzorg she?
