import { Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import SlotInfoForm from '../layouts/Form/SlotInfoForm';
import Iconify from '../components/Iconify';

export default function AddNewSlot() {

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Add New warehouse Slot
        </Typography>

        <Grid container spacing={3}>
          <SlotInfoForm />
            
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
