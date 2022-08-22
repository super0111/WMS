import { Box, Typography } from '@mui/material';

export const QRScanSlotResult = ({ item, i, allQRFile }) => {
  const results = item.result && item.result.slot ? item.result.slot : '';

  return (
    <div>
      {results && (
        <Box
          sx={{
            height: "340px",
            padding: '20px 15px 15px 15px',
            borderRadius: "10px",
            border: "1px solid #e9e8e8",
            "&:hover": {
              boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.12), 3px 3px 4px rgba(0, 0, 0, 0.24)",
            },
            ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
              height: 'auto !important'
            }
          }}
        >
          <div style={{cursor: "pointer", position: "relative"}} aria-hidden="true">
            <Box display="flex" justifyContent="center" 
              sx={{
                width : "100px", 
                overflow: "auto", 
                margin: "auto", 
                borderRadius: "10px", 
                padding: "3px", 
                marginBottom: "10px", 
                backgroundColor: "white",
              }}
            >
              <Typography 
                sx={{
                  marginRight: "10px", fontSize: "14px", fontWeight: "bold"
                }}
                varient="p"
              >
                Slot ID.
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: "14px", fontWeight: "bold"
                }} 
                varient="p"
              >
                {results.id}
              </Typography>
            </Box>
            <Typography 
              sx={{ 
                fontSize: "14px", fontWeight: "bold", margin:" -10px 0 10px 0", textAlign: "center" 
              }} 
              varient="p"
            >
              ({item.name})
            </Typography>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                }} 
                varient="p"
              >
                  Slot type
              </Typography>
              <Typography 
                varient="p"
              >
                {results.slotType}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                }} 
                variant="p"
              >
                Slot Location
              </Typography>
              <Typography 
                varient="p"
              >
                {results.slotLocation}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                }}
                variant="p"
              >
                Slot Pallet Capacity
              </Typography>
              <Typography 
                varient="p"
              >
                {results.slotCapacity}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                }} 
                variant="p"
              >
                Nubmer of open Slots
              </Typography>
              <Typography 
                varient="p"
              >
                {results.slotCapacity-results.filledNumber}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                }} 
                variant="p"
              >
                Number of Filled Slots
              </Typography>
              <Typography 
                varient="p"
              >
                {results.filledNumber}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                }} 
                variant="p"
              >
                Slot status
              </Typography>
              <Typography 
                varient="p"
                sx={{fontSize: "14px", textAlign: "right"}}
              >
                {results.error === true ? "Error status" : "Normal status"}
              </Typography>
            </Box>
          </div>
        </Box>
      )}
      {!results && 
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" 
            sx={{
              width: "100%",
              height: "340px",
              padding: "50px 0",
              border: "1px solid #e9e8e8",
              borderRadius: "8px",
              "&:hover": {
                boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.12), 3px 3px 4px rgba(0, 0, 0, 0.24)",
              },
              ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
                height: 'auto !important'
              }
            }}
          >
          <Typography sx={{textAlign: "center", marginTop: "10px"}}>Fialed QRCode Image</Typography>
          <Typography sx={{textAlign: "center", marginBottom: "10px"}}>({allQRFile[i].name})</Typography>
          <img style={{width: "120px", height: "120px", margin: "auto"}} src={URL.createObjectURL(allQRFile[i])} alt="fail QR" />
        </Box>
      }
    </div>
  )
}