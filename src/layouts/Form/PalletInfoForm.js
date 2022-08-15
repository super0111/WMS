import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography,TextField,Paper, Button  } from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

export default function PalletInfoForm(props) {
  const slotId = props.id;
  const [ id, setId ] = useState(0);
  const [ palletData, setPalletData ] = useState(JSON.parse(localStorage.getItem('palletData')) || []);
  const [ palletType, setPalletType ] = useState("")
  const [ palletDescription, setPalletDescription ] = useState("")
  const [ createdDate, setCreatedDate ] = useState("")
  const [ lastedDate, setLastedDate ] = useState("")
  const [ palletCondition, setPalletCondition ] = useState("")

  const handleCreatePallet = () => {
    const id = palletData.length +1;

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
  }
  console.log('palletData', palletData)


  useEffect(()=>{
    localStorage.setItem('palletData', JSON.stringify(palletData));
  }, [palletData])

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
            <Grid item xs={12} sm={6}>
              <TextField
                id="createdDate"
                fullWidth
                label="Data Created" 
                variant="standard"
                onChange={(e)=>setCreatedDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastedDate" 
                fullWidth
                label="Last Update" 
                variant="standard"
                onChange={(e)=>setLastedDate(e.target.value)}
              />
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
       </Container>
    </Page>
  );
}
