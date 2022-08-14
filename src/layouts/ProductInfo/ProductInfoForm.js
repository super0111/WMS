import { faker } from '@faker-js/faker';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,TextField,Paper, Checkbox , Button  } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';


// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------
// product infromation
// lot Number
// product serial Number

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
             <Typography variant="h6" color="inherit" noWrap>
            Product Information
          </Typography>

          <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
           required
            id="productID"
            name="lastName"
            label="Product ID"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="productDescriptio"
            label="Product Discription"
            fullWidth
            variant="standard"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
           id="outlined-basic" label="Outlined" variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic" label="Outlined" variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic" label="Outlined" variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           id="outlined-basic" label="Outlined" variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component={RouterLink} to="/dashboard/addNewItem" >
            Create product QR code
          </Button>
        </Grid>
      </Grid>
          
         </Paper>
      
       </Container>
      
    </Page>
  );
}
