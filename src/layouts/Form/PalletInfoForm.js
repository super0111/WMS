import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Typography,TextField,Paper, Button  } from '@mui/material';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

export default function PalletInfoForm(props) {
  const slotId = props.id;
  const navigate = useNavigate();
  const [ palletData, setPalletData ] = useState(JSON.parse(localStorage.getItem('palletData')) || []);
  const [ palletType, setPalletType ] = useState("")
  const [ palletDescription, setPalletDescription ] = useState("")
  const [ palletCondition, setPalletCondition ] = useState("")
  const [createdDate, setCreatedDate] = React.useState(new Date('2022-08-15T21:11:54'));
  const [lastedDate, setLastedDate] = React.useState(new Date('2022-08-16T21:11:54'));

  const handleCreatedDateChange = (newValue) => {
    setCreatedDate(newValue); 
  };
  const handleLastedDateChange = (newValue) => {
    setLastedDate(newValue);
  };

  const handleCreatePallet = () => {
    const id = palletData.length +1;
    if( palletType === "" || palletDescription === "" || createdDate === "" || lastedDate === "" || palletCondition === "" ) {
      toast.info("Enter all filed value")
      return
    }
    const formData = {
      id,
      slotId,
      palletType,
      palletDescription,
      createdDate,
      lastedDate,
      palletCondition,
    }
    setPalletData([...palletData, formData])
    localStorage.setItem('palletData', JSON.stringify([...palletData, formData]));
    navigate(-1)
  }

  return (
    <Page title="Dashboard">
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" color="inherit" noWrap>
            Pallet Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="palletType"
                name="lastName"
                label="Pallet Type"
                fullWidth
                variant="standard"
                onChange={(e)=>setPalletType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="palletDescription"
                label="Pallet Description"
                fullWidth
                variant="standard"
                onChange={(e)=>setPalletDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{marginTop: "20px"}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DateTimePicker
                    label="Created Date"
                    value={createdDate}
                    onChange={handleCreatedDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} sx={{marginTop: "20px"}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DateTimePicker
                    label="Lasted Date"
                    value={lastedDate}
                    onChange={handleLastedDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="palletCondition" 
                fullWidth
                label="Pallet Condition" 
                variant="standard"
                onChange={(e)=>setPalletCondition(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained"
                onClick={handleCreatePallet}
              >
                Create new Pallet
              </Button>
            </Grid>
          </Grid>
         </Paper>
         <ToastContainer />
       </Container>
    </Page>
  );
}
