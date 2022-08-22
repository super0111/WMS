import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Stack,
  Container,
  Typography,
  Grid,
  Box,
  Button,
} from '@mui/material';
import ScanCanvasQR from 'react-pdf-image-qr-scanner';

import ScannerSlotFileUpload from '../layouts/Form/ScannerSlotFileUpload';
import { QRScanSlotResult } from '../components/QRScanSlotResult';
import { QRScanPalletResult } from '../components/QRScanPalletResult';

const DetectQRCode = () => {
	const canvasScannerRef = useRef();
  const [ resultText, setResultText ] = useState("");
  const [ qrScanResults, setQrScanResults ] = useState([]) // name, type, result
  const [ detectData, setDetectData ] = useState(JSON.parse(localStorage.getItem('detectData')) || []);

  const [ allQRFile, setAllQRFile ] = useState([])

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
    setAllQRFile(files)
    setQrScanResults([]);
    let detectResult = [];

    if(files && files.length) {
      const fileList = [];
      const {length} = files;

      for (let i = 0; i < length; i += 1) {
        fileList.push(files[i]);
      }

      detectResult = await Promise.all(fileList.map(async (file) => scanSingleQRCode(file)));

    } else {
      console.log('file not found');
    }
    setQrScanResults(detectResult);
  }  

  const handleScanDataSave = () => {
    const resultArray = qrScanResults.map((item, i) => item.result );
    setDetectData([...detectData, ...resultArray])
  }

  useEffect(()=>{
    localStorage.setItem('detectData', JSON.stringify(detectData));
  }, [detectData])

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          QR Code Detection
        </Typography>
      </Stack>
      <Card 
        sx={{
          padding: "20px",
          '@media(maxWidth: 500px)' : {
            padding: '0px'
          }
        }}>
        <Grid container>
          <Grid item md={6} sm={6} xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
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
                onFileSelectSuccess={(files) => scanMultipleQRCode(files)}
                style={{ display: 'flex' }}
              />
            </Box>
          </Grid>
        </Grid>
        
        <Box>
          <Grid container>
            { qrScanResults.map((item, key) => (
              <Grid item key={key} lg={6} md={6} sm={12}  justifyContent="center" p="12px" sx={{margin: "auto", width: "100%"}}>
                { item.result.slot ?
                  <QRScanSlotResult item={item} i={key} allQRFile={allQRFile}/> :  
                  <QRScanPalletResult item={item} i={key} allQRFile={allQRFile} /> 
                }
              </Grid> ))
            }
            { qrScanResults.length === 0 &&   
              <div style={{margin: "auto", fontSize: "18px", color: "#de6035"}}>No Detect QR Code</div>
            }
            { qrScanResults.length > 0 &&
              <Box display="flex" justifyContent="center" sx={{width: "100%", padding: "10px 0"}}>
                <Button 
                  variant="outlined"
                  sx={{
                    width: "200px",
                    height: "30px",
                    fontSize: "14px",
                    margin: "auto",
                  }}
                  onClick={() =>handleScanDataSave()}
                >
                  Save QR Detected Data
                </Button>
              </Box>
            }
          </Grid>
        </Box>
      </Card>
    </Container>
  )
}

export default DetectQRCode