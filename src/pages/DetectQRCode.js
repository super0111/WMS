import React, { useState, useRef } from 'react';
import {
  Card,
  Stack,
  Container,
  Typography,
  Grid,
  Box,
} from '@mui/material';
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
  const [qrScanResults, setQrScanResults] = useState([]) // name, type, result

  async function scanSingleQRCode(file) {
    const supportedFiles = ['application/pdf','image/png','image/jpeg'];
    // const supportedFileEnds = supportedFiles.map(file => file.split('/')[1]).join(', ');
    // return new Promise((resolve, reject) => {
      try {
        if(supportedFiles.includes(file.type)) {
          const code = await canvasScannerRef.current.scanFile(file)
          const qr = code ? JSON.parse(code) : ''
          // const t = qr && qr.slot ? 'slot' : 'pallet'
          return Promise.resolve({ name: file.name, type: '', result: qr})
        }
        return Promise.resolve({ name: file.name, type: '', result: ''})
      } catch {
        // resolve({ name: file.name, type: '', result: ''})
        return Promise.resolve({ name: file.name, type: '', result: ''})
      }
    // })
  }
  async function scanMultipleQRCode(files) {
    setQrScanResults([])
    // const supportedFiles = ['application/pdf','image/png','image/jpeg'];
    // const supportedFileEnds = supportedFiles.map(file => file.split('/')[1]).join(', ');
    let result = []

    if(files && files.length) {
      const fileList = []
      const {length} = files

      for (let i = 0; i < length; i += 1) {
        fileList.push(files[i])
      }
      console.log(files)
      result = await Promise.all(fileList.map(async (file) => scanSingleQRCode(file)
      //   // const code = await canvasScannerRef.current.scanFile(file);
      //   // let item = {}
      //   // console.log(item)
      //   // result.push(item)
      ))
      // for(const file of files) {
      //   let item = { name: file.name, type: '', result: ''}
      //   if(supportedFiles.includes(file.type)) {
      //     const code = await canvasScannerRef.current.scanFile(file)
          
      //   } else {
      //     console.log('this file is not supported file, file must be a pdf/image')
      //   }
      // }
    } else {
      console.log('file not found')
    }
    console.log('scan result: ', result)
    setQrScanResults(result)
  }

	// async function scanFile(selectedFile, type) {
  //   setType(type);
	// 	setResultText("");
	// 	try {
	// 		const qrCode = await canvasScannerRef.current.scanFile(selectedFile);
  //     if(qrCode === null || results === "") {
  //       setNoResult(true)
  //     }
	// 		setResultText(qrCode || "No QR code found");
  //     const dataInfo = JSON.parse(qrCode);
  //     console.log("dataInfo", dataInfo)
  //     if(dataInfo.slot && type === "slot") {
  //       setResults(dataInfo.slot)
  //     } else 
  //     if(dataInfo.pallet) {
  //       setResults("")
  //     }
	// 	} catch (e) {
	// 		if (e?.name==="InvalidPDFException") {
	// 			setResultText("Invalid PDF");
	// 		} else if (e instanceof Event) {
	// 			setResultText("Invalid Image");
	// 		} else {
	// 			console.log(e)
	// 			setResultText("Unknown error");
	// 		}
	// 	}
  // }

  async function scanFile1(selectedFile, type) {
    // setType(type);
		// setResultText("");
		// try {
		// 	const qrCode = await canvasScannerRef.current.scanFile(selectedFile);

    //   if(qrCode === null || results === "") {
    //     setNoResult(true)
    //   }
		// 	setResultText(qrCode || "No QR code found");
    //   const dataInfo = JSON.parse(qrCode);
    //   if(dataInfo.slot) {
    //     setResults("")
    //   } else 
    //   if(dataInfo.pallet && type === "pallet") {
    //     setResults(dataInfo.pallet)
    //   }
		// } catch (e) {
		// 	if (e?.name==="InvalidPDFException") {
		// 		setResultText("Invalid PDF");
		// 	} else if (e instanceof Event) {
		// 		setResultText("Invalid Image");
		// 	} else {
		// 		console.log(e)
		// 		setResultText("Unknown error");
		// 	}
		// }
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
                  console.log(err);
                  setResultText(err.error) 
                }} 
                // onFileSelectSuccess={(file)=>{scanFile(file, "slot")}}
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
            {/* {
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
                <div>
                {
                  results ?
                  <div style={{cursor: "pointer", position: "relative"}} aria-hidden="true">
                    <Box display="flex" justifyContent="center" sx={{width : "80px", margin: "auto", borderRadius: "10px", padding: "3px", marginBottom: "10px", backgroundColor: "white"}}>
                      <Typography sx={{marginRight: "10px", fontSize: "14px", fontWeight: "bold"}} varient="p">Slot ID.</Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold"}} varient="p">{results.id}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} varient="p">Slot type</Typography>
                      <Typography varient="p">{results.slotType}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Slot Location</Typography>
                      <Typography varient="p">{results.slotLocation}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Slot Pallet Capacity</Typography>
                      <Typography varient="p">{results.slotCapacity}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Nubmer of open Slots</Typography>
                      <Typography varient="p">{results.slotCapacity-results.filledNumber}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Number of Filled Slots </Typography>
                      <Typography varient="p">{results.filledNumber}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Slot status</Typography>
                      <Typography varient="p">{results.error === true ? "Error status" : "Normal status"}</Typography>
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
                        onClick={handleSlotSave}
                      >
                        Save QR Detected Data
                      </Button>
                    </Box>
                  </div> : "No Results"
                }
                </div>
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
                      <Typography varient="p">{results.createdDate}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
                      <Typography sx={{width: "70%"}} variant="p">Last Update</Typography>
                      <Typography varient="p">{results.lastedDate}</Typography>
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
            } */}
          </Grid>
        </Grid>
        
        <Box>
          <Grid container>
            {qrScanResults.map((item, key) => (
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