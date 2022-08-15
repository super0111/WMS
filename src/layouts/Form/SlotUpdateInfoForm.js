import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography,TextField,Paper, Button  } from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

export default function SlotUpdateInfoForm() {
  const [ slotData,setSlotData ] = useState([])
  const [ slotType, setSlotType ] = useState("")
  const [ slotLocation, setSlotLocation ] = useState("")
  const [ slotCapacity, setSlotCapacity ] = useState("")
  const [ openNumber, setOpenNumber ] = useState("")
  const [ filledNumber, setFilledNumber ] = useState("")

  const handleCreateSlot = (props) => {
    const id = props.id;
    const formData = {
      slotType,
      slotLocation,
      slotCapacity,
      openNumber,
      filledNumber,
    }
    console.log("formdata", formData)
  }
  
  useEffect(()=> {
    const items = JSON.parse(localStorage.getItem('slotData'));
    
    setSlotData(items)
  }, [])

  return (
    <Page title="Dashboard">
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" color="inherit" noWrap>
            Slot Update Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="slotType"
                name="lastName"
                label="Slot Type"
                fullWidth
                variant="standard"
                onChange={(e)=>setSlotType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="slotLocation"
                label="Slot Location"
                fullWidth
                variant="standard"
                onChange={(e)=>setSlotLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="slotCapacity"
                fullWidth
                label="Slot Capacity" 
                variant="standard"
                onChange={(e)=>setSlotCapacity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="openSlotNumber" 
                fullWidth
                label="Open Slot Number" 
                variant="standard"
                onChange={(e)=>setOpenNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="filledSlotNumber" 
                fullWidth
                label="Filled Slot Number" 
                variant="standard"
                onChange={(e)=>setFilledNumber(e.target.value)}
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
       </Container>
    </Page>
  );
}
