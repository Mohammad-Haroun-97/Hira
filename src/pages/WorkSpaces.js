import React,{useEffect,useState} from 'react'
import "./WorkSpacesStyle.css"
import { BsFillPlusSquareFill } from 'react-icons/bs';
import axios from 'axios'
import CreateWorkSpaceModel from './CreateWorkSpaceModel.js'
import {Fab,Container,Grid} from '@mui/material';
import AirplayIcon from '@mui/icons-material/Airplay';
import { useNavigate } from 'react-router-dom'
import CampaignAuthPop from '../components/campaignAuthPop'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import { red,grey,blueGrey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// https://630c9dd853a833c534300ae2.mockapi.io/Workspaces
function WorkSpaces() {
    const navigate = useNavigate()
const [homeWorkspaces,setHomeWorkspaces]=useState([])
const [educationWorkspaces,setEducationWorkspaces]=useState([])
const [workWorkspaces,setWorkWorkspaces]=useState([])

const [openWorkspace,setOpenWorkspace]=useState(false)
const [workspaceAuth,setWorkspaceAuth]=useState(false)
const [workspaceId,setWorkspaceId]=useState(false)
const [workspaceType,setWorkspaceType]=useState('')



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'black',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundImage:"url('https://cdn.dribbble.com/userupload/2418043/file/original-b23c13f462a2850d23da48b940394e8d.png?compress=1&resize=1024x768')"
  }));
  


useEffect(() => {
    getAllWorkspaces()
  }, [openWorkspace])

async function getAllWorkspaces() {
    setHomeWorkspaces([])
    setEducationWorkspaces([])
    setWorkWorkspaces([])

 let allWorkSpaces= await axios.get('https://630c9dd853a833c534300ae2.mockapi.io/Workspaces')

 for (let i = 0; i < allWorkSpaces.data.length; i++) {
   if (allWorkSpaces.data[i].workspaceType=='home') {
    setHomeWorkspaces((prev)=>{return [...prev, allWorkSpaces.data[i]]} )
   }
   if (allWorkSpaces.data[i].workspaceType=='education') {
    setEducationWorkspaces((prev)=>{return [...prev, allWorkSpaces.data[i]]})
   }
   if (allWorkSpaces.data[i].workspaceType=='work') {
    setWorkWorkspaces((prev)=>{return [...prev, allWorkSpaces.data[i]]})
   }
 }
}

function openCreateWorkspace() {
    setOpenWorkspace(!openWorkspace)
}
function workspaceAuthHandler() {
    setWorkspaceAuth(!workspaceAuth)
    
}
function campaignHandler(payload) {
    setWorkspaceId(payload)
    workspaceAuthHandler()



    
// navigate(`/Campaign/${payload}`)
}

    return (
        <>
        {/* <Container maxWidth="sm"> */}
        { workspaceAuth &&<CampaignAuthPop workspaceId={workspaceId} workspaceAuthHandler={workspaceAuthHandler}/>}
        {openWorkspace && <CreateWorkSpaceModel openCreateWorkspace={openCreateWorkspace} workspaceType={workspaceType} /> }
        <AppBar xs={{mb:5}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon xs={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/Hira"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hira
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Container  maxWidth="lg">
        <Grid container spacing={2} sx={{mt:9}}>
  <Grid item xs={4}>
    <h2 className='projectTitle env'>Work Environments <BsFillPlusSquareFill onClick={()=>{
openCreateWorkspace() 
setWorkspaceType('work')
}}  className='addIcon'/> </h2>
  <div className='environment work'>
  <div style={{paddingTop:"30px",display:'block', marginLeft:'15%'}}>
            {workWorkspaces.map((item,index)=>
            <div>
            <div className='availableWorkspaces'>  
            <Fab onClick={()=>campaignHandler(item.workspaceID)} className="fabb" sx={{ width:"200px"
  ,backgroundColor:grey[900]  }} color= "secondary" >
            <AirplayIcon sx={{ position:'absolute',left:"20px" }} />
            {item.workspaceName.length >12 && item.workspaceName.slice(0,12)+ "..." }
            {item.workspaceName.length <=12 &&item.workspaceName}
            </Fab>
            <div className='connectedLine primary1'></div>
            </div>
            {index == workWorkspaces.length-1&& <div> <BsFillPlusSquareFill onClick={()=>{
openCreateWorkspace() 
setWorkspaceType('work')
}} className='addIcon primary' />  
            </div> }
            </div> )}
            </div> 

  </div>

  </Grid>
  <Grid item xs={4}>
  <h2 className='projectTitle env'>Education Environments<BsFillPlusSquareFill onClick={()=>{
openCreateWorkspace() 
setWorkspaceType('education')
}}  className='addIcon'/> </h2>
  <div className='environment education'>
  <div style={{paddingTop:"30px",display:'block', marginLeft:'15%'}}>
            {educationWorkspaces.map((item,index)=>
            <div>
            <div className='availableWorkspaces'>  
            <Fab onClick={()=>campaignHandler(item.workspaceID)} className="fabb" sx={{ width:"200px",backgroundColor:grey[700]}} color="secondary">
            <AirplayIcon sx={{ position:'absolute',left:"20px" }} />
            {item.workspaceName.length >12 && item.workspaceName.slice(0,12)+ "..." }
            {item.workspaceName.length <=12 &&item.workspaceName}

            </Fab>
            <div className='connectedLine secondary1'></div>
            </div>
            {index == educationWorkspaces.length-1&& <div> <BsFillPlusSquareFill onClick={()=>{
openCreateWorkspace() 
setWorkspaceType('education')
}}  className='addIcon secondary' />  
            </div> }
            </div> )}
            </div>

  </div>

  </Grid>
  <Grid item xs={4}>
  <h2 className='projectTitle env'>Home Environments <BsFillPlusSquareFill onClick={()=>{
openCreateWorkspace() 
setWorkspaceType('home')
}} className='addIcon'/></h2>
  <div className='environment home'>
  <div style={{paddingTop:"30px",display:'block', marginLeft:'15%'}}>
            {homeWorkspaces.map((item,index)=>
            <div>
            <div className='availableWorkspaces'>  
            <Fab onClick={()=>campaignHandler(item.workspaceID)} className="fabb" sx={{ width:"200px",backgroundColor:blueGrey[500]}} color="secondary">
            <AirplayIcon sx={{ position:'absolute',left:"20px" }} />
            {item.workspaceName.length >12 && item.workspaceName.slice(0,11)+ "..." }
            {item.workspaceName.length <=12 &&item.workspaceName}
            </Fab>
            <div className='connectedLine warning1'></div>
            </div>
            {index == homeWorkspaces.length-1&& <div> <BsFillPlusSquareFill onClick={()=>
                {openCreateWorkspace() 
                    setWorkspaceType('home')

                } } className='addIcon warning' />  
            </div> }
            </div> )}
            </div>

  </div>

  </Grid>

</Grid>
</Container>
    
            {/* </Container> */}
        </>
    )
    
}

export default WorkSpaces