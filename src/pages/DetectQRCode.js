
import React, { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import ScanCanvasQR from 'react-pdf-image-qr-scanner';

import Iconify from '../components/Iconify';
import ScannerSlotFileUpload from '../layouts/Form/ScannerSlotFileUpload';
import ScannerPalletFileUpload from '../layouts/Form/ScannerPalletFileUpload';

const DetectQRCode = () => {
	const canvasScannerRef = useRef();
  // const [ results, setResults ] = useState([]);
  const [ results, setResults ] = useState("");
  const [ resultText, setResultText ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ noResult, setNoResult ] = useState(false);
  const [ type, setType ] = useState("")

  const [ results1, setResults1 ] = useState([])
  const [ resultText1, setResultText1 ] = useState("");
  const [ firstName1, setFirstName1 ] = useState("");
  const [ noResult1, setNoResult1 ] = useState(false);


	async function scanFile(selectedFile, type) {

    setType(type)
		setResultText("");
		try {
			const qrCode = await canvasScannerRef.current.scanFile(selectedFile);

      if(qrCode === null || results === "") {
        setNoResult(true)
      }
			setResultText(qrCode || "No QR code found");

      const dataInfo = JSON.parse(qrCode);
      if(dataInfo.slot && type === "slot") {
        setResults(dataInfo.slot)
      } else 
      if(dataInfo.pallet && type === "pallet") {
        setResults(dataInfo.pallet)
      }
      // if (qrCode) setResults([...results, qrCode])
      // results.map((result, i) =>(
      //   setFirstName(result)
      // ))
		} catch (e) {
			if (e?.name==="InvalidPDFException") {
				setResultText("Invalid PDF");
			} else if (e instanceof Event) {
				setResultText("Invalid Image");
			} else {
				console.log(e)
				setResultText("Unknown error");
			}
		}
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          QR Code Detection
        </Typography>
      </Stack>
      <Card sx={{padding: "20px"}}>
        <Grid container>
          <Grid item md={6} sm={6} xs={12}
            sx={{
              padding: '20px 15px 15px 15px',
              margin: "auto"
            }}
          >
            <Box display="flex" justifyContent="space-between" sx={{margin: "10px 0",}}>
              <ScanCanvasQR ref={canvasScannerRef}/>
              <ScannerSlotFileUpload 
                onFileSelectError={(err) => { 
                  console.log(err);
                  setResultText(err.error) 
                }} 
                onFileSelectSuccess={(file)=>{scanFile(file, "slot")}}
                style={{ display: 'flex' }}
              />
              <ScannerPalletFileUpload 
                onFileSelectError={(err) => { 
                  console.log(err);
                  setResultText1(err.error)
                }} 
                onFileSelectSuccess={(file)=>{scanFile(file, "pallet")}}
                style={{ display: 'flex' }}
              />
            </Box>
            {
              type === "slot" ?
              <Box
                sx={{
                  padding: '20px 15px 15px 15px',
                  borderRadius: "10px",
                  border: "1px solid #eeeeee",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                  "&:hover": {
                    boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.12), 3px 3px 4px rgba(0, 0, 0, 0.24)",
                  },
                }}
              >
                {
                  results ?
                  <div style={{cursor: "pointer", position: "relative"}} aria-hidden="true">
                    <Box display="flex" justifyContent="center" sx={{width : "80px", margin: "auto", borderRadius: "10px", padding: "3px", marginBottom: "10px", backgroundColor: "white"}}>
                      <Typography sx={{marginRight: "10px", fontSize: "14px", fontWeight: "bold"}} varient="p">Slot ID.</Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold"}} varient="p">{results.id}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} varient="p">Slot type</Typography>
                      <Typography varient="p">{results.type}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Slot Location</Typography>
                      <Typography varient="p">{results.location}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Slot Pallet Capacity</Typography>
                      <Typography varient="p">{results.capacity}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Nubmer of open Slots</Typography>
                      <Typography varient="p">{results.capacity-results.filledNumber}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Number of Filled Slots </Typography>
                      <Typography varient="p">{results.filledNumber}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Slot status</Typography>
                      <Typography varient="p">{results.error === true ? "Error status" : "Normal status"}</Typography>
                    </Box>
                  </div> : "No Results"
                }
              </Box> :
              <Box
                sx={{
                  padding: '20px 15px 15px 15px',
                  borderRadius: "10px",
                  border: "1px solid #eeeeee",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                  "&:hover": {
                    boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.12), 3px 3px 4px rgba(0, 0, 0, 0.24)",
                  },
                }}
              >
                {
                  results ?
                  <div style={{cursor: "pointer", position: "relative"}} aria-hidden="true">
                    <Box display="flex" justifyContent="center" sx={{width : "80px", margin: "auto", borderRadius: "10px", padding: "3px", marginBottom: "10px", backgroundColor: "white"}}>
                      <Typography sx={{marginRight: "10px", fontSize: "14px", fontWeight: "bold"}} varient="p">Pallet ID.</Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold"}} varient="p">{results.id}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} varient="p">Pallet type</Typography>
                      <Typography varient="p">{results.type}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Pallet Description</Typography>
                      <Typography varient="p">{results.description}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Data Created</Typography>
                      <Typography varient="p">{results.createdDate}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Last Update</Typography>
                      <Typography varient="p">{results.updateDate}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Pallet Condition</Typography>
                      <Typography varient="p">{results.condition}</Typography>
                    </Box>
                  </div> : "No Results"
                }
              </Box>
            }

          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default DetectQRCode