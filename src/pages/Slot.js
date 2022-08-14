import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { slots } from "../data";


const Slot = () => {
  const navigate = useNavigate()
  const [ selected, setSelected ] = useState([]);
  const [ filterName, setFilterName ] = useState('');
  const [ selectSlot, setSelectSlot ] = useState("");

  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSlotClick = (id) => {
    navigate(`/dashboard/pallet/${id}`)
  }
  const handleKeyDown = (ev, id) => {
    // check keys if you want
    if (ev.keyCode === 13) {
      navigate(`/dashboard/pallet/${id}`)
    }
  }

  const generateQrCode = async (id) => {
    const slot = slots.find(item=>item.id === id);
    const qrCodeData = JSON.stringify({ slot })
    setSelectSlot(id)

    try {
      const response = await QRCode.toDataURL(qrCodeData);
      setQrCodeUrl(response);
    }catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          Warehouse Slot
        </Typography>
        <Button variant="contained" component={RouterLink} to="/dashboard/addNewItem" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Slot
        </Button>
      </Stack>
        <Card sx={{padding: "20px"}}>
          <SlotListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <Grid container>
              {
                slots.map((item, i)=>(
                  <Grid item md={4} sm={6} xs={12}
                    sx={{
                      padding: '20px 15px 15px 15px',
                    }}
                  >
                    <Box 
                      sx={{
                        ...(
                          item.capacity > item.filledNumber ? 
                          {
                            backgroundColor: "hsl(80deg 38% 51%)",
                          }: 
                          // item.capacity > item.filledNumber ? 
                          {
                            backgroundColor: "#ff7a6b",
                          } 
                          // : item.error === true ? 
                          // {
                          //   backgroundColor: "hsl(9deg 68% 85%)",
                          // } 
                          // : ""
                        ),
                        padding: '20px 15px 15px 15px',
                        borderRadius: "10px",
                        border: "1px solid #eeeeee",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                        "&:hover": {
                          boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.12), 3px 3px 4px rgba(0, 0, 0, 0.24)",
                        },
                      }}
                    >
                      <div style={{cursor: "pointer"}} aria-hidden="true" onClick={()=>handleSlotClick(item.id)} onKeyDown={()=>handleKeyDown(item.id)}>
                        <Box display="flex" justifyContent="center" sx={{width : "80px", margin: "auto", borderRadius: "10px", padding: "3px", marginBottom: "10px", backgroundColor: "white"}}>
                          <Typography sx={{marginRight: "10px", fontSize: "14px", fontWeight: "bold"}} varient="p">Slot ID.</Typography>
                          <Typography sx={{ fontSize: "14px", fontWeight: "bold"}} varient="p">{item.id}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} varient="p">Slot type</Typography>
                          <Typography varient="p">{item.type}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Slot Location</Typography>
                          <Typography varient="p">{item.location}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Slot Pallet Capacity</Typography>
                          <Typography varient="p">{item.capacity}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Nubmer of open Slots</Typography>
                          <Typography varient="p">{item.capacity-item.filledNumber<=0?0:item.capacity-item.filledNumber}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                          <Typography sx={{width: "70%"}} variant="p">Number of Filled Slots </Typography>
                          <Typography varient="p">{item.filledNumber}</Typography>
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
                      <Box display="flex" justifyContent="flex-end" sx={{marginTop: "10px"}}>
                        <Button
                          variant="outlined" 
                          sx={{fontSize: "12px", background: "white"}}
                          onClick={() => generateQrCode(item.id)}
                        >
                          Slot QR Code
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))
              }
            </Grid>
          </Scrollbar>
        </Card>
    </Container>
  )
}

export default Slot