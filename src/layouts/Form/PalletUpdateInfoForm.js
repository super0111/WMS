import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography,TextField,Paper, Button  } from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

export default function PalletInfoForm(props) {
  const id = props.id;
  const [ palletData, setPalletData ] = useState(JSON.parse(localStorage.getItem('palletData')) || []);
  const [ updateItem, setUpdateItem ] = useState("")
  const [ palletId, setPalletID ] = useState("")
  const [ palletSlotId, setPalletSlotId ] = useState("")
  const [ palletType, setPalletType ] = useState("")
  const [ palletDescription, setPalletDescription ] = useState("")
  const [ createdDate, setCreatedDate ] = useState("")
  const [ lastedDate, setLastedDate ] = useState("")
  const [ palletCondition, setPalletCondition ] = useState("")

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
            <Grid item xs={12} sm={6}>
              <TextField
                id="createdDate"
                fullWidth
                label="Data Created" 
                variant="standard"
                value={createdDate}
                onChange={(e)=>setCreatedDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastedDate" 
                fullWidth
                label="Last Update" 
                variant="standard"
                value={lastedDate}
                onChange={(e)=>setLastedDate(e.target.value)}
              />
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
                Create new Pallet
              </Button>
            </Grid>
          </Grid>
         </Paper>
       </Container>
    </Page>
  );
}
