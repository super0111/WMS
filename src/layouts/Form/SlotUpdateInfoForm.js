import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Typography,TextField,Paper, Button  } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from '../../components/Page';
import config from '../../config';
import { slotUpdate } from "../../apis/slot";

export default function SlotUpdateInfoForm(props) {
  const id = props.id;
  const navigate = useNavigate();
  const [ slotData, setSlotData ] = useState([]);
  const [ creator, setCreator ] = useState("");
  const [ slotSerial, setSlotSerial ] = useState("")
  const [ slotType, setSlotType ] = useState("")
  const [ slotDescription, setSlotDescription ] = useState("")
  const [ slotOpens, setSlotOpens ] = useState("")
  const [ slotFills, setSlotFills ] = useState("")

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('token'));
    setCreator(user.email);
  }, [creator])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios(`${config.server_url}dashboard/slot/getBySerial/${id}`);
      setSlotData(res.data);
    };
    fetchPosts();
  }, [])

  useEffect(() => {
    setSlotSerial(slotData?.SLOT_SERIAL)
    setSlotType(slotData?.SLOT_TYPE)
    setSlotDescription(slotData?.DESCRIPTION)
    setSlotOpens(slotData?.OPEN_SLOTS)
    setSlotFills(slotData?.FILLED_SLOTS)
  }, [slotData])

  const handleUpdateSlot = () => {
    if( slotSerial === "" || slotType === "" || slotDescription === "" || slotOpens === "" || slotFills === "" ) {
      toast.info("Enter all filed value")
      return
    }
    const formData = {
      creator,
      slot_serial: slotSerial,
      slot_type: slotType,
      description: slotDescription,
      open_slots: slotOpens,
      filled_slots: slotFills,
    }
    slotUpdate(formData)
    .then((res)=>{
      console.log("update ressss", res.creator)
      if(res.creator) {
        toast.info("Slot Update Successfully")
      } else {
        toast.error("Slot Update Failed")
      }
    })
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
                id="slotSerial"
                name="lastName"
                label="Slot Serial"
                fullwidth="true"
                variant="standard"
                value={slotSerial}
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
                value={slotType}
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
                value={slotDescription}
                onChange={(e)=>setSlotDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                id="slotOpens"
                fullwidth="true"
                label="Open Slots" 
                variant="standard"
                value={slotOpens}
                onChange={(e)=>setSlotOpens(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                id="slotFills" 
                fullwidth="true"
                label="Filled Slots" 
                variant="standard"
                value={slotFills}
                onChange={(e)=>setSlotFills(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained"
                onClick={handleUpdateSlot}
              >
                Update slot
              </Button>
            </Grid>
          </Grid>
         </Paper>
         <ToastContainer />
       </Container>
    </Page>
  );
}
