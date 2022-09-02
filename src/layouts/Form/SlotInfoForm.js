import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Typography,TextField,Paper, Button, Checkbox  } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from '../../components/Page';
import { slotCreate } from "../../apis/slot";

export default function SlotInfoForm() {
  const navigate = useNavigate();
  const [ slotData, setSlotData ] = useState([]);
  const [ slotSerial, setSlotSerial ] = useState("");
  const [ slotType, setSlotType ] = useState("");
  const [ creator, setCreator ] = useState("");
  const [ slotDescription, setSlotDescription ] = useState("");
  const [ slotCapacity, setSlotCapacity ] = useState("");
  const [ openNumber, setOpenNumber ] = useState("");
  const [ filledNumber, setFilledNumber ] = useState("");
  const [ slotError, setChecked ] = useState(false);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('token'));
    setCreator(user.email);
  }, [creator])

  const handleCreateSlot = () => {
    const id = slotData.length +1;
    if( slotType === "" || slotDescription === "" || openNumber === "" || filledNumber === "" ) {
      toast.info("Enter all filed value")
      return
    }
    const formData = {
      slot_serial: slotSerial,
      slot_type: slotType,
      description: slotDescription,
      open_slots: openNumber,
      filled_slots: filledNumber,
      creator,
    }
    slotCreate(formData)
    .then((res)=>{
      if(res.status === 204) {
        toast.info("new slot create successfully");
      }
      else toast.error("new slot create failed")
    })
  }

  return (
    <Page title="Dashboard">
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" color="inherit" noWrap>
            Slot Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="slotSerial"
                name="lastName"
                label="Slot Serial"
                fullwidth="true"
                variant="standard"
                onChange={(e)=>setSlotSerial(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="slotType"
                name="lastName"
                label="Slot Type"
                fullwidth="true"
                variant="standard"
                onChange={(e)=>setSlotType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="slotDescription"
                label="Slot Description"
                fullwidth="true"
                variant="standard"
                onChange={(e)=>setSlotDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                id="slotOpenNumber"
                fullwidth="true"
                label="Slot Open Number" 
                variant="standard"
                onChange={(e)=>setOpenNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                id="filledSlotNumber" 
                fullwidth="true"
                label="Filled Slot Number" 
                variant="standard"
                onChange={(e)=>setFilledNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}
              sx={{
                display: "flex",
                alignItems: 'center',
              }}
            >
              <Typography component='div'>Slot Status</Typography>
              <Checkbox
                id="filledSlotNumber" 
                fullwidth="true"
                label="Filled Slot Number" 
                variant="standard"
                checked={slotError}
                onChange={(e)=>setChecked(e.target.checked)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained"
                onClick={handleCreateSlot}
              >
                Create new slot
              </Button>
            </Grid>
          </Grid>
         </Paper>
         <ToastContainer />
       </Container>
    </Page>
  );
}
