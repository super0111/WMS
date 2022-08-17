import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Typography,TextField,Paper, Button  } from '@mui/material';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Page from '../../components/Page';

export default function PalletInfoForm(props) {
  const id = props.id;
  const navigate = useNavigate();
  const [ palletData, setPalletData ] = useState(JSON.parse(localStorage.getItem('palletData')) || []);
  const [ updateItem, setUpdateItem ] = useState("")
  const [ palletId, setPalletID ] = useState("")
  const [ palletSlotId, setPalletSlotId ] = useState("")
  const [ palletType, setPalletType ] = useState("")
  const [ palletDescription, setPalletDescription ] = useState("")
  const [ createdDate, setCreatedDate ] = useState("")
  const [ lastedDate, setLastedDate ] = useState("")
  const [ palletCondition, setPalletCondition ] = useState("")

  const handleCreatedDateChange = (newValue) => {
    setCreatedDate(newValue); 
  };
  const handleLastedDateChange = (newValue) => {
    setLastedDate(newValue);
  };

  useEffect(() => {
    const item = palletData.find((item)=>Number(item.id) === Number(id));
    setUpdateItem(item);
  }, [palletData])

  useEffect(() => {
    setPalletID(updateItem?.id)
    setPalletSlotId(updateItem?.slotId)
    setPalletType(updateItem?.palletType)
    setPalletDescription(updateItem?.palletDescription)
    setCreatedDate(updateItem?.createdDate)
    setLastedDate(updateItem?.lastedDate)
    setPalletCondition(updateItem?.palletCondition)
  }, [updateItem])

  useEffect(() => {
    localStorage.setItem('palletData', JSON.stringify(palletData))
  }, [palletData, updateItem])

  const handleUpdatePallet = () => {
    const formData = {
      id,
      slotId: palletSlotId,
      palletType,
      palletDescription,
      createdDate,
      lastedDate,
      palletCondition,
    }

    setPalletData(palletData.map((item) => {
      if(Number(item.id) === Number(formData.id)) {
        return formData
      }
      return item;
    }))
    const items = palletData.filter((item)=>Number(item.id) !== Number(id));
    localStorage.setItem('palletData', JSON.stringify([...palletData, items]))
    navigate(-1)
  }

  return (
    <Page title="Dashboard">
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" color="inherit" noWrap>
            Pallet Update Information
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
                value={palletType}
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
                value={palletDescription}
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
                label="Pallet Condition"
                fullWidth
                variant="standard"
                value={palletCondition}
                onChange={(e)=>setPalletCondition(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained"
                onClick={handleUpdatePallet}
              >
                Update Pallet
              </Button>
            </Grid>
          </Grid>
         </Paper>
       </Container>
    </Page>
  );
}
