import { Box, Typography } from '@mui/material'
import Moment from 'moment';

export const QRScanPalletResult = ({ item, i, allQRFile }) => {
  const results = item.result && item.result.pallet ? item.result.pallet : ''
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
            <Box display="flex" justifyContent="center" sx={{width : "100px", overflow: "auto", margin: "auto", borderRadius: "10px", padding: "3px", marginBottom: "10px", backgroundColor: "white"}}>
              <Typography 
                sx={{
                  marginRight: "10px", fontSize: "14px", fontWeight: "bold",
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }} 
                varient="p"
              >
                Pallet ID.
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: "14px", fontWeight: "bold",
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }}
                varient="p"
              >
                {results.id}
              </Typography>
            </Box>
            <Typography 
              sx={{ 
                fontSize: "14px", fontWeight: "bold", margin:" -10px 0 10px 0", textAlign: "center",
                '@media(maxWidth: 580px)' : {
                  fontSize: '13px'
                }
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
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }} 
                varient="p"
              >
                Pallet type
              </Typography>
              <Typography 
                varient="p"
                sx={{
                  fontSize: "14px",
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }}
              >
                {results.palletType}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }} 
                variant="p"
              >
                Pallet Description
              </Typography>
              <Typography 
                varient="p"
                sx={{
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }}
              >
                {results.palletDescription}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }} 
                variant="p"
                >
                  Data Created
              </Typography>
              <Typography 
                varient="p"
                sx={{
                  width: "200px",
                  textAlign: "right",
                  fontSize: '14px',
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }}
              >
                { Moment(results.createdDate).format('YYYY-MM-DD HH:mm') }
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  fontSize: "14px",
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }} 
                variant="p"
              >
                Last Update
              </Typography>
              <Typography 
                varient="p"
                sx={{
                  width: "200px",
                  textAlign: "right",
                  fontSize: "14px",
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }}
              >
                { Moment(results.lastedDate).format('YYYY-MM-DD HH:mm') }
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{padding: "3px 8px", marginBottom: "10px", backgroundColor: "white", border: "1px solid #7db1f5", borderRadius: "3px"}}>
              <Typography 
                sx={{
                  width: "70%",
                  fontSize: "14px",
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }} 
                variant="p"
              >
                Pallet Condition
              </Typography>
              <Typography 
                varient="p"
                sx={{
                  '@media(maxWidth: 580px)' : {
                    fontSize: '13px'
                  }
                }}
              >
                {results.palletCondition}
              </Typography>
            </Box>
          </div>
        </Box>
      )}
      {!results && 
        <Box display="flex" flexDirection="column" justifyContent="center" 
          sx={{
            width: "100%",
            padding: "50px 0",
            height: "340px",
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