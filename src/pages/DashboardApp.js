import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import { Budget } from '../sections/@dashboard/app/budget';
import { Sales } from '../sections/@dashboard/app/sales';
import { TasksProgress } from '../sections/@dashboard/app/tasks-progress';
import { TotalCustomers } from '../sections/@dashboard/app/total-customers';
import { TotalProfit } from '../sections/@dashboard/app/total-profit';
import { TrafficByDevice } from '../sections/@dashboard/app/traffic-by-device';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3} >
          <Grid item lg={3} sm={6} xl={3} xs={12} >
            <Budget />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12} >
            <TotalCustomers />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12} >
            <TasksProgress />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12} >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12} >
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
