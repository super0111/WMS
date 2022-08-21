import { Box, Typography, Button } from '@mui/material'

export const QRScanResult = ({ item, handleSlotSave }) => {
  const results = item.result && item.result.slot ? item.result.slot : ''
  return (
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
      {results && (<div style={{cursor: "pointer", position: "relative"}} aria-hidden="true">
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
      </div>)}
      {!results && "No Result"}
    </Box>
  )
}