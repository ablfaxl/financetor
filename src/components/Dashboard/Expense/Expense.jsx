import React, { useState, useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import RoomIcon from "@mui/icons-material/Room";
//style
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ExpenseBox } from "./ExpenseStyle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "leaflet/dist/leaflet.css";
import { StyledTableCell, StyledTableRow } from "../Tag/TagStyle";
//
const CREATE_EXPENSES = gql`
  mutation Create_expense($data: ExpenseInfo!) {
    create_expense(data: $data) {
      status
      msg
    }
  }
`;
//
const GET_TAG = gql`
  query GetMyTags {
    getMyTags {
      _id
      name
      color
      expenseCount
    }
    getMyExpenses {
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
`;
//
const DELETE_EXPENSE = gql`
  mutation Mutation($id: ID!) {
    delete_expense(_id: $id) {
      status
      msg
    }
  }
`;
//
const EDIT_EXPENSE = gql`
  mutation Mutation($id: ID!, $data: ExpenseInfo!) {
    edit_expense(_id: $id, data: $data) {
      status
      msg
    }
  }
`;

//
function Expense() {
  //state
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [tagId, setTagId] = useState("choose");
  const [date, setDate] = useState("");
  const mapRef = useRef(null);
  const editmapRef = useRef(null);
  
  // edit state
  const [editmydate, setEditMydate] = useState(null);
  const [editamount, setEditAmount] = useState(null);
  const [edittag_id, setEditTag_id] = useState('choose');
  const [editlat, setEditlat] = useState(null);
  const [editlon, setEditlon] = useState(null);
  const [id, setid] = useState('');
  const [editmodal, setEditmodal] = useState(false);
  //Query
  const { data, error, loading, refetch } = useQuery(GET_TAG);
  //Mutation
  const [mutationFunction] = useMutation(CREATE_EXPENSES);
  const [DeleteExpense] = useMutation(DELETE_EXPENSE);
  const [EditExpense] = useMutation(EDIT_EXPENSE);

  const creaeteExpense = async () => {
    if (tagId === "choose") return alert("plz choose");
    try {
      const ResExpense = await mutationFunction({
        variables: {
          data: {
            amount: Number(amount),
            date: date,
            geo: {
              lat: parseFloat(mapRef.current.getCenter().lat),
              lon: parseFloat(mapRef.current.getCenter().lng),
            },
            tag: tagId,
          },
        },
      });
      console.log(ResExpense);
      refetch();
      return alert("ok");
    } catch (error) {
      console.log(error);
    }
  };
  //
  const edit_expense = async (id) => {
    console.log('idddd====>',id)
    try {
      
      if (!editmydate || !editamount) return alert("please fill all sections");
      if (edittag_id === 'choose') return alert('please choose');

      const editexpense = await EditExpense({
        variables: {
        "id": id,
        "data": {
          "amount": Number(editamount),
          "geo": {
            "lat": parseFloat(editmapRef.current.getCenter().lat),
            "lon": parseFloat(editmapRef.current.getCenter().lng),
          },
          "tag": edittag_id,
          "date": editmydate
        }
      }
    })
    console.log(editexpense);
      setEditmodal(false);
      return alert("success");

    } catch (error) {
      return alert("error");
    }
  }
  //
  const delete_expense = async (tagId) => {
    try {
      const deleteExpense = await DeleteExpense({
        variables: {
          id: tagId,
        },
      });
      console.log(deleteExpense);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  // modal 
  const handleClose = () => setOpen(false);
  
  const handleOpen = (item) => {
    setOpen(true);
    setEditMydate(item.date);
    setEditAmount(item.amount);
    setEditTag_id(item.tag._id);
    console.log('item=dd=>',item.tag._id)
    setEditlat(item.geo.lat);
    setEditlon(item.geo.lon);
    setid(item._id)
  };
  //
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error!</h4>;

  const mapIcon = icon({
    iconUrl: "/asset/marker.png",
    iconSize: [18, 18],
  });

  return (
    <>
      <ExpenseBox>
        <Box bgcolor="gray" sx={{ width: "40%", height: "95vh" }}>
          <Typography
            sx={{ fontFamily: "cursive" }}
            color="black"
            align="center"
            variant="h4"
          >
            create expense
          </Typography>

          <Stack
            p={2}
            justifyContent={"space-between"}
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <TextField
              sx={{ width: "50%" }}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="amount"
            />
            <TextField
              sx={{ width: "50%" }}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
            <Select
              value={tagId}
              onChange={(e) => {
                console.log("id==>", e.target.value);
                setTagId(e.target.value);
              }}
            >
              <MenuItem sx={{ width: "50%" }} value="choose">
                select your tag
              </MenuItem>
              {data?.getMyTags.map((item, i) => {
                // console.log(item.name)
                return (
                  <MenuItem key={i} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            <Box sx={{ width: "300px", height: "200px" }}>
              <MapContainer
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                center={["35.8073145", "51.8353402"]}
                zoom={13}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationOnIcon
                  sx={{
                    zIndex: 500,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                  }}
                />
              </MapContainer>
            </Box>
            <br />
            <Button
              variant="contained"
              sx={{
                bgcolor: "black",
                ":hover": { bgcolor: "#ac9e9e", color: "black" },
              }}
              onClick={creaeteExpense}
            >
              create
            </Button>
          </Stack>
        </Box>
        {/*  */}
        <Box bgcolor="#2f2f2f" sx={{ width: "60%" }}>
          <Stack
            gap={1}
            flexDirection={"row"}
            flexWrap="wrap"
            justifyContent={"space-between"}
            sx={{ padding: 1 }}
          >
            {data.getMyExpenses.map((item) => {
              return (
                <>
                  <Card>
                    <Stack sx={{ width: "200px", height: "140px", padding: 1 }}>
                      <MapContainer
                        // ref={mapRef}
                        style={{ width: "100%", height: "100%" }}
                        center={[item.geo.lat, item.geo.lon]}
                        zoom={16}
                        scrollWheelZoom={true}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                          position={[item.geo.lat, item.geo.lon]}
                          icon={mapIcon}
                        ></Marker>
                      </MapContainer>
                    </Stack>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "60%",
                      }}
                    >
                      <Typography variant="subtitle1" color="text.secondary">
                        Amuont:
                        <span style={{ color: "#323232" }}>{item.amount}</span>
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Tag:
                        <span style={{ color: "#323232" }}>
                          {item.tag.name}
                        </span>
                      </Typography>
                      {/* <Typography align='left'>
      <span style={{color:"#323232"}}>
        {item.date}
      </span>
      </Typography>        */}
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        onClick={() => delete_expense(item._id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={()=>handleOpen(item)} aria-label="edit">
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <span style={{ color: "#323232", fontSize: "12px" }}>
                          {item.date}
                        </span>
                      </IconButton>
                    </CardActions>
                  </Card>
                </>
              );
            })}
          </Stack>
        </Box>
      </ExpenseBox>
      {/* Modal Edit */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#fff",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography align="center" variant="h6" component="h5">
            Edit Expense
          </Typography>
          <Stack gap={2} p={2}>
            <TextField
              value={editamount}
              onChange={(e) => setEditAmount(e.target.value)}
              placeholder="amount"
              type="number"
            />

            <TextField
                  value={editmydate}
                  onChange={(e) => setEditMydate(e.target.value)}
              placeholder="date"
              type="date"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={edittag_id}
              onChange={(e) => setEditTag_id(e.target.value)}
            >
              <MenuItem value="choose">Select your tag</MenuItem>
              {data.getMyTags.map((item) => {
                return <MenuItem value={item._id}>{item.name}</MenuItem>;
              })}
              </Select>
              <Box sx={{ width: "300px", height: "200px",paddingLeft:4 }}>
                <MapContainer
                  ref={editmapRef}
                  // center={[editlat, editlon]}
                  center={["35.8073145", "51.8353402"]}
                  zoom={16}
                  scrollWheelZoom={true}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationOnIcon
                    sx={{
                      color: "blue",
                      zIndex: "1000",
                      position: "absolute",
                      top: "calc(50% - 24px)",
                      left: "calc(50% - 24px)",
                      fontSize: "40px",
                    }}
                  />
                </MapContainer>
              </Box>



            <Button variant="contained" onClick={() => edit_expense(id)}>
              edit
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* Modal Edit */}
    </>
  );
}

export default Expense;
