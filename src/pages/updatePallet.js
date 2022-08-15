import { Grid, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from '../components/Page';
import PalletUpdateInfoForm from '../layouts/Form/PalletUpdateInfoForm';
import Iconify from '../components/Iconify';

export default function UpdatePallet() {
  const id = useParams();
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Update Slot Pallet
        </Typography>

        <Grid container spacing={3}>
          <PalletUpdateInfoForm id={id.id} />
        </Grid>
      </Container>
    </Page>
  );
}
