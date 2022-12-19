import { Box, Button, Modal, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
// style
import { EditInput, RightBox, StyledTableCell, StyledTableRow, StyledTextField, TagBox, deleteModal } from "./TagStyle";
import { LeftBox } from "./TagStyle";
import AlertModal from "../../pages/Alert";
import EditIcon from '@mui/icons-material/Edit';
import { ModalBox } from "../../pages/Layout/LayoutStyle";
import DeleteIcon from '@mui/icons-material/Delete';
//

const CREATE_TAG  = gql`

mutation Create_tag($data: tagInfo!) {
  create_tag(data: $data) {
    status
    msg
  }
}
`;

const GET_TAG = gql`
query GetMyTags {
  getMyTags {
    _id
    name
    color
    expenseCount
  }
}
`

const EDIT_TAG = gql`
mutation Edit_tag($data: tagInfo!, $id: ID!) {
  edit_tag(data: $data, _id: $id) {
    status
    msg
  }
}
`
const DELETE_TAG = gql`
mutation Delete_tag($id: ID!) {
  delete_tag(_id: $id) {
    status
    msg
  }
}
`


function Tag() {

const[name, setName] = useState("");
const[color, setColor] = useState("");
const [editName, setEditName] = useState("")
const [editColor, setEditColor] = useState("")
const [id , setId] = useState("")
const { data, loading, error, refetch } = useQuery(GET_TAG)
// console.log('my tag is =>' ,data.getMyTags[1]._id)
const [mutateFunction] = useMutation(CREATE_TAG)
const [editFunction] = useMutation(EDIT_TAG)
const [DeleteTag] = useMutation(DELETE_TAG);

//
const [open, setOpen] = useState(false);
const [status,setStatus]=useState("")
const [text, setText] = useState("")
 //modal
 const [openModal, setOpenModal] = useState(false);
 const handleOpenModal = () => setOpenModal(true);
 const handleCloseModal = () => setOpenModal(false);
 //modal


 //delete modal
 const [isOpen, setIsOpen] = useState(false)
 const [delete_id, setDelete_id] = useState(null);

 //delete modal

 
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
//

  const addTag = async () => {
    try {
        if (!name || !color)  {handleClick("warning", "please fill all input")} ;

        const Tag = await mutateFunction({
          variables: {  
            "data": {
              "name": name,
              "color": color,
            },
        },
        });
        // console.log(Tag);
        {
          handleClick("success", "Your Tag Created")
          refetch()
        }
      } catch (error) {
        {handleClick("warning", "please fill all input")} 
        console.log(error); 
      }
    };

    const EditTag = async (id) =>{
      // console.log(id)
      try {

        const {data: {edit_tag: {status}}}  = await editFunction({
          variables:{
            "data": {
              "name": editName,
              "color": editColor,
            },
            "id": id,
          }
        })

        if (status == 200) {
          alert('ok')
          refetch()
        }
      } catch (error) {
        console.log(error)
      }
    }
    const delete_Tag = async (id) =>{
      // console.log(id)
      try {

        const {data: {delete_tag: {status}}}  = await DeleteTag({
          variables:{
              "id": id,
          }
        })

        if (status == 200) {
          // alert('ok')
          refetch()
          setIsOpen(false)
          setDelete_id(null)
        }
      } catch (error) {
        console.log(error)
      }
    }


if(error) return <h4>Error!</h4>
if(loading) return <h4>Loading...</h4>
// orginal modal  for delete
const CustomModal = ({ _id, cta, closeModal }) => {
  
  const [route, setroute] = useState('sefr')

  const obj = {
    'sefr': <div>
      Are u sure? 1
      <br />
      <Button variant="contained" onClick={closeModal} > close  </Button>
      <Button variant="contained"  onClick={() => setroute('yek')} > yes im sure  </Button>
    </div>,
    'yek': <div>
      Are u sure? 2
      <br />
      <Button variant="contained" onClick={closeModal} > close  </Button>
      <Button variant="contained"  onClick={() => setroute('do')} > yes im sure  </Button>
    </div>,
      'do': <div>
        Are u really really sure ? 3
        <br />
        <Button variant="contained" onClick={closeModal} > close  </Button>
        <Button variant="contained"  onClick={() => setroute('se')} > yes im  sure  </Button>
    </div>,
    'se': <div>
      Namosi ? 
    <br />
    <Button variant="contained" onClick={closeModal} > close  </Button>
    <Button variant="contained"  onClick={() => cta(_id)} > Namosi !  </Button>
</div>,
  }

  const ConditionalRender = route => {

    if (!obj[route]) return <h4> unwritten component </h4>

    return obj[route]
  }


  return (
      <Box
      sx={{
    backgroundColor: 'gray', width: 300, height: 200,
    position: "fixed",
    top: 'calc(50vh - 150px)',
    left: 'calc(50vw - 100px)',
    zIndex: 50,
    borderRadius: 12,
    fontSize: 20, color: '#fff',
    padding: 6,
    
      }}
      >
      {ConditionalRender(route)} 
      </Box>
  )
}
// orginal modal 






  return (
    <>
       {
        isOpen && <CustomModal
          _id={delete_id}
          cta={delete_Tag}
          closeModal={() => {
            setIsOpen(false);
            
          }}
        />
      }
      <TagBox>
        {/* <RightBox> */}
          <Box bgcolor='#000000' width={"70%"} sx={{height:'500px', marginLeft:'30%'}}>
          <TableContainer sx={{ paddingTop:2}} >
      <Table  sx={{ width:'80%', marginLeft:'65px' }} aria-label="customized table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>My Tags</StyledTableCell>
            <StyledTableCell align="right">name</StyledTableCell>
            <StyledTableCell align="right">color</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.getMyTags.map((item, i) => {
            // console.log(item.color)
            return(

              <>
              <StyledTableRow key={i}>
              <StyledTableCell
              onClick={()=>{setOpenModal(true); setId(item._id); setEditName(item.name);setEditColor(item.color) }}
              //  onClick={()=>{handleOpenModal; setId(item.id)}} 
               component="th" scope="row" sx={{color:"white", cursor:"pointer"}}>
              <EditIcon/>
              
              </StyledTableCell>
              <StyledTableCell sx={{color:"white"}} align="right">{item.name}</StyledTableCell>
              <StyledTableCell sx={{color:"white"}} align="right">
                <TextField sx={{width:"60pX", height:"60px"}}  value={item.color} type={"color"} />
                {/* {item.color} */}
                </StyledTableCell>
              {/* <StyledTableCell sx={{color:"white"}} align="right">{item.expenseCount}</StyledTableCell> */}
              <StyledTableCell 
              onClick={() => {setIsOpen(true); setDelete_id(item._id)}}
              sx={{color:"white"}} align="right">
              <DeleteIcon sx={{":hover":{color:"red"}, cursor:"pointer"}}/>
              </StyledTableCell>
              </StyledTableRow>
          </>
                )
          })}
        </TableBody>
      </Table>
    </TableContainer>
        
          </Box>
        
        {/* </RightBox> */}
        {/*  */}
        <LeftBox>
        <Typography pb={2} sx={{fontFamily:"cursive"}} align="center" variant="h4">
          Create Tag 
        </Typography>
        <Stack flexDirection={"column"} spacing={2}>
        <StyledTextField 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name" />
        <StyledTextField 
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="color" type={"color"} />
        <Button onClick={addTag} sx={{color: "white", bgcolor:"rgb(65, 65, 65)"}}> Create </Button>
        </Stack>
        </LeftBox>

      </TagBox>
                {/* Modal Edit */}
                <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <ModalBox  sx={{height:"150px", height:"150px",paddingTop:12}}>
            <Stack justifyContent={'space-between'} flexDirection="row" alignItems='center'>
            <EditInput 
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="name" />   
        
        <EditInput 
        placeholder="color"
         type={"color"}
        value={editColor}
        onChange={(e) => setEditColor(e.target.value)}
        />
        <Button variant="contained" onClick={(e) => EditTag(id)} color="primary">submit</Button>
          </Stack>
          
        </ModalBox>
      </Modal>
        {/* Modal */}
      <AlertModal handleClose={handleClose} open={open}  status={status} text={text} />
    </>
  );
}


export default Tag;
