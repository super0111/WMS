import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import QRCode from 'qrcode';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import { SlotListToolbar } from '../sections/@dashboard/slot';
import config from '../config';
import { slotDelete } from '../apis/slot';

const Slot = () => {
  const navigate = useNavigate();
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem('token')) || null);
  const [ slotData, setSlotData ] = useState([]);
  const [ selected, setSelected ] = useState([]);
  const [ filterValue, setFilterValue ] = useState('');
  const [ selectSlot, setSelectSlot ] = useState("");
  const [ qrCodeUrl, setQrCodeUrl ] = useState('');
  const [ searchDatas, setSearchData ] = useState([]);

  const handleFilterByName = (event) => {
    setFilterValue(event.target.value)
    if(event.target.value !== "") {
      const searchData = slotData.filter((item) => 
        (item.SLOT_SERIAL).indexOf((event.target.value)) > -1
      )
      setSearchData(searchData)
      return;
    }
    setSearchData(slotData)
  };

  const handleSlotClick = (id) => {
    navigate(`/dashboard/pallet/${id}`)
  }

  const handleKeyDown = (ev, id) => {
    if (ev.keyCode === 13) {
      navigate(`/dashboard/pallet/${id}`)
    }
  }

  const generateQrCode = async (id) => {
    const slot = slotData.find(item=>item === id);
    const qrCodeData = JSON.stringify({ slot })
    setSelectSlot(id)
    try {
      const response = await QRCode.toDataURL(qrCodeData);
      setQrCodeUrl(response);
    }catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await axios(`${config.server_url}dashboard/slot/getAll`);
      setSlotData(res.data);
      setSearchData(res.data)
    };
    fetchPosts();
  }, [])

/* eslint-disable camelcase */

  const handleSlotDelete = (slot_serial) => {
    slotDelete(slot_serial)
    .then((res)=>{
      setSlotData(slotData.filter((item)=>Number(item.SLOT_SERIAL) !== Number(res.data)))
      setSearchData(slotData.filter((item)=>Number(item.SLOT_SERIAL) !== Number(res.data)))
    })
  }


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          Warehouse Slot
        </Typography>
        { token.userRole === "admin" &&
          <Button variant="contained" component={RouterLink} to="/dashboard/addNewSlot" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Slot
          </Button>
        }
      </Stack>
        <Card sx={{padding: "20px"}}>
          <SlotListToolbar numSelected={selected.length} filterValue={filterValue} onFilterValue={handleFilterByName} />

          <Scrollbar>
            <Grid container>
              {
                searchDatas.length > 0 ?
                searchDatas.map((item, i)=>(
                  <Grid item md={4} sm={6} xs={12} key={i}
                    sx={{
                      padding: '20px 15px 15px 15px',
                    }}
                  >
                    <Box
                      sx={{
                        // eslint-disable-next-line no-nested-ternary                       
                        backgroundColor: `${item.slotError
                        ? '#ff7a6b'
                        :  Number(item.OPEN_SLOTS) >= Number(item.FILLED_SLOTS)
                        ? "hsl(80deg 38% 51%)"
                        : 'hsl(9deg 68% 85%)'}`,
                        padding: '20px 15px 15px 15px',
                        borderRadius: "10px",
                        border: "1px solid #eeeeee",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                        "&:hover": {
                          boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.12), 3px 3px 4px rgba(0, 0, 0, 0.24)",
                        },
                      }}
                    >
                      <div style={{cursor: "pointer", position: "relative"}} aria-hidden="true" onClick={()=>handleSlotClick(item.SLOT_SERIAL)} onKeyDown={()=>handleKeyDown(item.SLOT_SERIAL)}>
                        <Box display="flex" justifyContent="center" sx={{width : "80px", margin: "auto", borderRadius: "10px", padding: "3px", marginBottom: "10px", backgroundColor: "white"}}>
                          <Typography sx={{marginRight: "10px", fontSize: "14px", fontWeight: "bold"}} varient="p">Slot ID.</Typography>
                          <Typography sx={{ fontSize: "14px", fontWeight: "bold"}} varient="p">{i+1}</Typography>
                        </Box>
                        {
                          item.slotError && <Typography sx={{position: "absolute", top: "-10px", right: "0px", fontSize: "14px", color: "white"}} variant="p">Slot Error</Typography>
                        }
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Slot Serial</Typography>
                          <Typography varient="p">{item.SLOT_SERIAL}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} varient="p">Slot type</Typography>
                          <Typography varient="p">{item.SLOT_TYPE}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Slot Description</Typography>
                          <Typography varient="p">{item.DESCRIPTION}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Slot Pallet Capacity</Typography>
                          <Typography varient="p">{item.OPEN_SLOTS + item.FILLED_SLOTS}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Nubmer of open Slots</Typography>
                          {/* <Typography varient="p">{item.slotCapacity-item.filledNumber<=0 ? 0 : item.slotCapacity-item.filledNumber}</Typography> */}
                          <Typography varient="p">{item.OPEN_SLOTS}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Number of Filled Slots </Typography>
                          <Typography varient="p">{item.FILLED_SLOTS}</Typography>
                        </Box>
                      </div>

                      <Box display="flex" justifyContent="center">
                        {qrCodeUrl && selectSlot === i+1 ? 
                          ( <a href={qrCodeUrl} download>
                              <img src={qrCodeUrl} alt="img"/>
                          </a>)
                          : null
                        }
                      </Box>
                      <Box display="flex" justifyContent="space-between" sx={{marginTop: "10px"}}>
                        { token.userRole === "admin" &&
                          <>
                            <Button
                              variant="outlined" 
                              sx={{fontSize: "12px", background: "white", marginRight: "10px"}}
                              component={RouterLink} to={`/dashboard/updateSlot/${item.SLOT_SERIAL}`}
                            >
                              Update
                            </Button>
                            <Button
                              variant="outlined" 
                              sx={{
                                fontSize: "12px",
                                color: "#fe6c62",
                                background: "white", 
                                border: "1px solid #fe6c62",
                                marginRight: "10px",
                                '&:hover': {
                                  color: "white",
                                  background: "#fe6c62",  
                                  border: "1px solid #fe6c62",
                                }
                              }}
                              onClick={()=>handleSlotDelete(item.SLOT_SERIAL)}
                            >
                              Delete
                            </Button>
                          </>
                        }
                        <Button
                          variant="outlined" 
                          sx={{fontSize: "12px", background: "white"}}
                          onClick={() => generateQrCode(item.SLOT_SERIAL)}
                        >
                          QR Code
                        </Button>
                      </Box>
                    </Box>
                  </Grid> 
                )) : 
                <Box display="flex" justifyContent="center" sx={{width: "100%"}}>
                  <Typography component="p" sx={{ textAlign: "center" }}>No Data</Typography>
                </Box>
              }
            </Grid>
          </Scrollbar>
        </Card>
    </Container>
  )
}

export default Slot