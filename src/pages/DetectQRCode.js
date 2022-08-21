import React, { useState, useRef } from 'react';
import {
  Card,
  Stack,
  Container,
  Typography,
  Grid,
  Box,
  Button,
} from '@mui/material';
import Moment from 'moment';
import ScanCanvasQR from 'react-pdf-image-qr-scanner';

import ScannerSlotFileUpload from '../layouts/Form/ScannerSlotFileUpload';
import ScannerPalletFileUpload from '../layouts/Form/ScannerPalletFileUpload';
import { QRScanResult } from '../components/QRScanResult';

const DetectQRCode = () => {
	const canvasScannerRef = useRef();
  const [ results, setResults ] = useState("");
  const [ resultText, setResultText ] = useState("");
  const [ noResult, setNoResult ] = useState(false);
  const [ type, setType ] = useState("")
  const [ resultText1, setResultText1 ] = useState("");
  const [qrScanSlotResults, setQrScanSlotResults] = useState([]) // name, type, result
  const [qrScanPalletResults, setQrScanPalletResults] = useState([]) // name, type, result

  async function scanSingleQRCode(file) {
    const supportedFiles = ['application/pdf','image/png','image/jpeg'];
      try {
        if(supportedFiles.includes(file.type)) {
          const code = await canvasScannerRef.current.scanFile(file)
          const qr = code ? JSON.parse(code) : ''
          return Promise.resolve({ name: file.name, type: '', result: qr})
        }
        return Promise.resolve({ name: file.name, type: '', result: ''})
      } catch {
        return Promise.resolve({ name: file.name, type: '', result: ''})
      }
  }
  async function scanMultipleQRCode(files) {
    setQrScanSlotResults([]);
    let result = [];
    if(files && files.length) {
      const fileList = [];
      const {length} = files;

      for (let i = 0; i < length; i += 1) {
        fileList.push(files[i]);
      }
      result = await Promise.all(fileList.map(async (file) => scanSingleQRCode(file)));
    } else {
      console.log('file not found');
    }
    setQrScanSlotResults(result);
  }

  async function scanFile1(selectedFile, type) {
    setType(type);
		setResultText("");
		try {
			const qrCode = await canvasScannerRef.current.scanFile(selectedFile);

      if(qrCode === null || results === "") {
        setNoResult(true)
      }
			setResultText(qrCode || "No QR code found");
      const dataInfo = JSON.parse(qrCode);
      if(dataInfo.slot) {
        setResults("")
      } else 
      if(dataInfo.pallet && type === "pallet") {
        setResults(dataInfo.pallet)
      }
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

  const handleSlotSave = () => {
    const {id} = results;
    const {slotType} = results;
    const {slotLocation} = results;
    const {slotCapacity} = results;
    const {filledNumber} = results;
    const formData = {
      id,
      slotType,
      slotLocation,
      slotCapacity,
      filledNumber,
    }
    localStorage.setItem('detectedPallet', JSON.stringify(formData));
  }

  const handlePalletSave = () => {
    const {id} = results;
    const {palletType} = results;
    const {palletDescription} = results;
    const {createdDate} = results;
    const {lastedDate} = results;
    const {palletCondition} = results;
    const formData = {
      id,
      palletType,
      palletDescription,
      createdDate,
      lastedDate,
      palletCondition,
    }
    localStorage.setItem('detectedSlot', JSON.stringify(formData));
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
                  setResultText(err.error) 
                }} 
                onFileSelectSuccess={(files) => scanMultipleQRCode(files, "slot")}
                style={{ display: 'flex' }}
              />
              <ScannerPalletFileUpload 
                onFileSelectError={(err) => { 
                  console.log(err);
                  setResultText1(err.error)
                }} 
                onFileSelectSuccess={(file)=>{scanFile1(file, "pallet")}}
                style={{ display: 'flex' }}
              />
            </Box>
            {
              type === "pallet" &&
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
                    <Box display="flex" justifyContent="center" sx={{width : "100px", margin: "auto", borderRadius: "10px", padding: "3px", marginBottom: "10px", backgroundColor: "white"}}>
                      <Typography sx={{marginRight: "10px", fontSize: "14px", fontWeight: "bold"}} varient="p">Pallet ID.</Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold"}} varient="p">{results.id}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} varient="p">Pallet type</Typography>
                      <Typography varient="p">{results.palletType}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Pallet Description</Typography>
                      <Typography varient="p">{results.palletDescription}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Data Created</Typography>
                      <Typography varient="p">{ Moment(results.createdDate).format('YYYY-MM-DD HH:mm') }</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Last Update</Typography>
                      <Typography varient="p">{ Moment(results.lastedDate).format('YYYY-MM-DD HH:mm') }</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Pallet Condition</Typography>
                      <Typography varient="p">{results.palletCondition}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" sx={{width: "100%", padding: "10px 0"}}>
                      <Button 
                        variant="outlined"
                        sx={{
                          width: "200px",
                          height: "30px",
                          fontSize: "14px",
                          margin: "auto",
                        }}
                        onClick={handlePalletSave}
                      >
                        Save QR Detected Data
                      </Button>
                    </Box>

                  </div> : "No Results"
                }
              </Box>
            }
          </Grid>
        </Grid>
        
        <Box>
          <Grid container>
            {qrScanSlotResults.map((item, key) => (
              <Grid item key={key} lg={6} justifyContent="center" p="12px">
                <QRScanResult item={item} handleSlotSave={handleSlotSave} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </Container>
  )
}

export default DetectQRCode