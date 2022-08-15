import { Grid, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from '../components/Page';
import SlotUpdateInfoForm from '../layouts/Form/SlotUpdateInfoForm';
import Iconify from '../components/Iconify';

export default function UpdateSlot() {
  const id = useParams();
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Update warehouse Slot
        </Typography>

        <Grid container spacing={3}>
          <SlotUpdateInfoForm id={id.id} />
        </Grid>
      </Container>
    </Page>
  );
}
