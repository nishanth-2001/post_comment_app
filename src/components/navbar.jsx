import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ px:"40px"}} position="static">
        <Toolbar>
          
          <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, ":hover": {cursor: "pointer" }}}
          onClick={()=> navigate("/")}>
            Facebook
          </Typography>
          <Button 
          color="inherit"
          style={{ marginRight: "5px"}}
          onClick={() => navigate("/posts")}>
            Posts
        
          </Button>
          <Button 
          color="inherit"
          onClick={() => navigate("/users")}
         >
            Users
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar