import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Typography,TextField,Paper, Button, Checkbox  } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

export default function SlotInfoForm() {
  const navigate = useNavigate();
  const [ slotData, setSlotData ] = useState(JSON.parse(localStorage.getItem('slotData')) || []);
  const [ slotType, setSlotType ] = useState("");
  const [ slotLocation, setSlotLocation ] = useState("");
  const [ slotCapacity, setSlotCapacity ] = useState("");
  const [ openNumber, setOpenNumber ] = useState("");
  const [ filledNumber, setFilledNumber ] = useState("");
  const [ slotError, setChecked ] = useState(false);

  const handleCreateSlot = () => {
    const id = slotData.length +1;
    if( slotType === "" || slotLocation === "" || slotCapacity === "" || filledNumber === "" ) {
      toast.info("Enter all filed value")
      return
    }

    const formData = {
      id,
      slotType,
      slotLocation,
      slotCapacity,
      openNumber,
      filledNumber,
      slotError,
    }
    setSlotData([...slotData, formData]);
    localStorage.setItem('slotData', JSON.stringify([...slotData, formData]));
    navigate(-1)
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
                id="slotType"
                name="lastName"
                label="Slot Type"
                fullwidth
                variant="standard"
                onChange={(e)=>setSlotType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="slotLocation"
                label="Slot Location"
                fullwidth
                variant="standard"
                onChange={(e)=>setSlotLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                id="slotCapacity"
                fullwidth
                label="Slot Capacity" 
                variant="standard"
                onChange={(e)=>setSlotCapacity(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                id="openSlotNumber" 
                fullwidth
                label="Open Slot Number" 
                variant="standard"
                onChange={(e)=>setOpenNumber(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                id="filledSlotNumber" 
                fullwidth
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
                fullwidth
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
