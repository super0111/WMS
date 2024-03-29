import React, { useState, useEffect } from 'react';
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
import Moment from 'moment';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import { PalletListToolbar } from '../sections/@dashboard/slot';
// import { pallets, slots } from "../data";

const Pallet = () => {
  const { id } = useParams();
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem('token')) || null)
  const [ palletData, setPalletData ] = useState(JSON.parse(localStorage.getItem('palletData')) || []);
  const [ searchDatas, setSearchData ] = useState(JSON.parse(localStorage.getItem('palletData')) || []);
  const [ selected, setSelected ] = useState([]);
  const [ filterValue, setFilterValue ] = useState('');
  const [ selectPallet, setSelectPallet ] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(()=> {
    const items = palletData.filter(item=>Number(item.slotId) === Number(id));
    setSearchData(items)
  }, [palletData])

  const handleFilterByName = (event) => {
    setFilterValue(event.target.value)
    const items = palletData.filter(item=>Number(item.slotId) === Number(id));
    
    if(event.target.value !== "") {
      const searchData = items.filter((item) => Number(item.id) === Number(event.target.value))
      setSearchData(searchData)
      return;
    }
    setSearchData(items)
  };

  const generateQrCode = async (id) => {
    const pallet = palletData.find(item=>item.id === id);
    const qrCodeData = JSON.stringify({ pallet })
    setSelectPallet(id)

    try {
      const response = await QRCode.toDataURL(qrCodeData);
      setQrCodeUrl(response);
    }catch (error) {
      console.log(error);
    }
  }

  const handlePalletDelete = (id) => {
    const deleteData = palletData.filter((item)=>item.id !== id);
    localStorage.setItem('palletData', JSON.stringify(deleteData));
    setPalletData(deleteData)
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          Warehouse Pallet <Typography variant='strong'>(Slot {id})</Typography>
        </Typography>
        { token.userRole === "admin" &&
          <Button variant="contained" component={RouterLink} to={`/dashboard/addNewPallet/${id}`} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Pallet
          </Button>
        }
      </Stack>
        <Card sx={{padding: "20px"}}>
          <PalletListToolbar numSelected={selected.length} filterValue={filterValue} onFilterValue={handleFilterByName} />

          <Scrollbar>
            <Grid container>
              {
                searchDatas.length > 0 ?
                searchDatas.map((item, i)=>(
                  <Grid key={i} item md={4} sm={6} xs={12}
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
                        <Typography sx={{width: "50%"}} varient="span">Pallet Slot type</Typography>
                        <Typography varient="span">{item.palletType}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "50%"}} variant="span">Pallet Descrition</Typography>
                        <Typography varient="span">{item.palletDescription}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "50%"}} variant="span">Date Created</Typography>
                        <Typography varient="span" sx={{fontSize: "15px"}}>{ Moment(item.createdDate).format('YYYY-MM-DD HH:mm') }</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "50%"}} variant="span">Last Update</Typography>
                        <Typography varient="span" sx={{fontSize: "15px"}}>{ Moment(item.lastedDate).format('YYYY-MM-DD HH:mm') }</Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "5px",}}>
                        <Typography sx={{width: "50%"}} variant="span">Pallet condition</Typography>
                        <Typography varient="span">{item.palletCondition}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="center">
                        { qrCodeUrl && selectPallet === item.id ? 
                          ( <a href={qrCodeUrl} download>
                              <img src={qrCodeUrl} alt="img"/>
                          </a>)
                          : null
                        }
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        { token.userRole === "admin" &&
                          <>
                            <Button
                              variant="outlined"
                              sx={{fontSize: "12px", background: "white", marginRight: "10px"}}
                              component={RouterLink} to={`/dashboard/updatePallet/${item.id}`}
                            >
                              Update
                            </Button>
                            <Button
                              variant="outlined" 
                              sx={{
                                fontSize: "12px",
                                color: "#fe6c62",
                                background: "white", 
                                border: "1px solid #fe6c62",
                                marginRight: "10px",
                                '&:hover': {
                                  color: "white",
                                  background: "#fe6c62",  
                                  border: "1px solid #fe6c62",
                                }
                              }}
                              onClick={()=>handlePalletDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </>
                        } 
                        <Button 
                          variant="outlined" 
                          sx={{
                            fontSize: "12px", 
                            background: "white"
                          }}
                          onClick={() => generateQrCode(item.id)}
                        >
                          QR Code
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                )) :
                <Box display="flex" justifyContent="center" sx={{width: "100%"}}>
                  <Typography component="p" sx={{ textAlign: "center" }}>No Data</Typography>
                </Box>
              }
            </Grid>
          </Scrollbar>
        </Card>
    </Container>
  )
}

export default Pallet