import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import QRCode from 'qrcode';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import { SlotListToolbar } from '../sections/@dashboard/slot';
import { pallets, slots } from "../data";

const Pallet = () => {
  const { id } = useParams();
  const [ selected, setSelected ] = useState([]);
  const [ filterName, setFilterName ] = useState('');
  const [ selectPallet, setSelectPallet ] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const items = pallets.filter(item=>item.slotId === Number(id));

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const generateQrCode = async (id) => {
    const pallet = pallets.find(item=>item.id === id);
    const qrCodeData = JSON.stringify({ pallet })
    setSelectPallet(id)

    try {
      const response = await QRCode.toDataURL(qrCodeData);
      setQrCodeUrl(response);
    }catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          Warehouse Pallet <Typography variant='strong'>(Slot {id})</Typography>
        </Typography>
        <Button variant="contained" component={RouterLink} to="/dashboard/addNewItem" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Pallet
        </Button>
      </Stack>
        <Card sx={{padding: "20px"}}>
          <SlotListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <Grid container>
              {
                items.map((item, i)=>(
                  <Grid item md={4} sm={6} xs={12}
                    sx={{
                      padding: '20px 15px 15px 15px',
                    }}
                  >
                    <Box 
                      sx={{
                          padding: '20px 15px 15px 15px',
                          borderRadius: "10px",
                          border: "1px solid #eeeeee",
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                          "&:hover": {
                            boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.12), 1px 1px 2px rgba(0, 0, 0, 0.24)",
                          },
                        }}
                    >
                      <Box display="flex" justifyContent="center" sx={{width : "120px", margin: "auto", borderRadius: "10px", padding: "3px", marginBottom: "10px", backgroundColor: "white"}}>
                        <Typography sx={{marginRight: "10px", fontSize: "14px", fontWeight: "bold"}} varient="p">Pallet ID.</Typography>
                        <Typography sx={{ fontSize: "14px", fontWeight: "bold"}} varient="p">{item.id}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "70%"}} varient="p">Pallet Slot type</Typography>
                        <Typography varient="p">{item.type}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "70%"}} variant="p">Pallet Descrition</Typography>
                        <Typography varient="p">{item.description}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "70%"}} variant="p">Date Created</Typography>
                        <Typography varient="p">{item.createdDate}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "70%"}} variant="p">Last Update</Typography>
                        <Typography varient="p">{item.updateDate}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "70%"}} variant="p">Pallet condition</Typography>
                        <Typography varient="p">{item.condition}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="center">
                        { qrCodeUrl && selectPallet === item.id ? 
                          ( <a href={qrCodeUrl} download>
                              <img src={qrCodeUrl} alt="img"/>
                          </a>)
                          : null
                        }
                      </Box>
                      <Box display="flex" justifyContent="flex-end">
                        <Button 
                          variant="outlined" 
                          sx={{fontSize: "12px", background: "white"}}
                          onClick={() => generateQrCode(item.id)}
                        >
                          Pallet QR Code
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))
              }
            </Grid>
          </Scrollbar>
        </Card>
    </Container>
  )
}

export default Pallet