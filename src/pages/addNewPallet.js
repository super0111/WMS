import { useParams } from 'react-router-dom';
import { Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import PalletInfoForm from '../layouts/Form/PalletInfoForm';
import Iconify from '../components/Iconify';

export default function AddNewPallet() {
  const id = useParams();
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Add New Slot Pallet
        </Typography>

        <Grid container spacing={3}>
          <PalletInfoForm id={id.id} />
        </Grid>
      </Container>
    </Page>
  );
}
