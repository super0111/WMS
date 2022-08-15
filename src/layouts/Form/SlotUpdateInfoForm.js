import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Typography,TextField,Paper, Button  } from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

export default function SlotUpdateInfoForm(props) {
  const id = props.id;
  const navigate = useNavigate();
  const [ slotData, setSlotData ] = useState(JSON.parse(localStorage.getItem('slotData')) || []);
  const [ updateItem, setUpdateItem ] = useState("")
  const [ slotType, setSlotType ] = useState("")
  const [ slotLocation, setSlotLocation ] = useState("")
  const [ slotCapacity, setSlotCapacity ] = useState("")
  const [ filledNumber, setFilledNumber ] = useState("")

  useEffect(() => {
    const item = slotData.find((item)=>item.id === Number(id));
    setUpdateItem(item);
  }, [])

  useEffect(() => {
    setSlotType(updateItem?.slotType)
    setSlotLocation(updateItem?.slotLocation)
    setSlotCapacity(updateItem?.slotCapacity)
    setFilledNumber(updateItem?.filledNumber)
  }, [updateItem])

  useEffect(() => {
    console.log('updated slot data: ', slotData)
    localStorage.setItem('slotData', JSON.stringify(slotData))
  }, [slotData])

  const handleCreateSlot = () => {
    const formData = {
      id: Number(id),
      slotType,
      slotLocation,
      slotCapacity,
      filledNumber,
    }
    console.log('updated data: ', formData)
    setSlotData(slotData.map((item) => {
      if(item.id === formData.id) {
        return formData
      }
      return item;
    }))
    const items = slotData.filter((item)=>Number(item.id) !== Number(id));
    localStorage.setItem('slotData', JSON.stringify([...slotData, items]))
    navigate(-1)
  }



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
                fullwidth
                variant="standard"
                value={slotType}
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
                value={slotLocation}
                onChange={(e)=>setSlotLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="slotCapacity"
                fullwidth
                label="Slot Capacity" 
                variant="standard"
                value={slotCapacity}
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
                id="filledSlotNumber" 
                fullwidth
                label="Filled Slot Number" 
                variant="standard"
                value={filledNumber}
                onChange={(e)=>setFilledNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained"
                onClick={handleCreateSlot}
              >
                Update slot
              </Button>
            </Grid>
          </Grid>
         </Paper>
       </Container>
    </Page>
  );
}
