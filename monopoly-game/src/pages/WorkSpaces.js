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

return(
<>

</>
)

    
// navigate(`/Campaign/${payload}`)
}

    return (
        <>
        {/* <Container maxWidth="sm"> */}
        { workspaceAuth &&<CampaignAuthPop workspaceId={workspaceId} workspaceAuthHandler={workspaceAuthHandler}/>}
        {openWorkspace && <CreateWorkSpaceModel openCreateWorkspace={openCreateWorkspace} workspaceType={workspaceType} /> }
        <h1 className='projectTitle'>Hira</h1>
<Container  maxWidth="lg">
        <Grid container spacing={2}>
  <Grid item xs={4}>
    <h2 style={{textAlign:'center',fontFamily:"cursive"}}>Work Environments <BsFillPlusSquareFill onClick={()=>{
openCreateWorkspace() 
setWorkspaceType('work')
}}  className='addIcon'/> </h2>
  <div className='environment work'>
  <div style={{paddingTop:"30px",display:'block', marginLeft:'15%'}}>
            {workWorkspaces.map((item,index)=>
            <div>
            <div className='availableWorkspaces'>  
            <Fab onClick={()=>campaignHandler(item.workspaceID)} className="fabb" sx={{ width:"200px"}} color="primary">
            <AirplayIcon sx={{ position:'absolute',left:"20px" }} />
            {item.workspaceName}
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
  <h2 style={{textAlign:'center',fontFamily:"cursive"}}>Education Environments<BsFillPlusSquareFill onClick={()=>{
openCreateWorkspace() 
setWorkspaceType('education')
}}  className='addIcon'/> </h2>
  <div className='environment education'>
  <div style={{paddingTop:"30px",display:'block', marginLeft:'15%'}}>
            {educationWorkspaces.map((item,index)=>
            <div>
            <div className='availableWorkspaces'>  
            <Fab onClick={()=>campaignHandler(item.workspaceID)} className="fabb" sx={{ width:"200px"}} color="secondary">
            <AirplayIcon sx={{ position:'absolute',left:"20px" }} />
            {item.workspaceName}
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
  <h2 style={{textAlign:'center',fontFamily:"cursive"}}>Home Environments <BsFillPlusSquareFill onClick={()=>{
openCreateWorkspace() 
setWorkspaceType('home')
}} className='addIcon'/></h2>
  <div className='environment home'>
  <div style={{paddingTop:"30px",display:'block', marginLeft:'15%'}}>
            {homeWorkspaces.map((item,index)=>
            <div>
            <div className='availableWorkspaces'>  
            <Fab onClick={()=>campaignHandler(item.workspaceID)} className="fabb" sx={{ width:"200px"}} color="warning">
            <AirplayIcon sx={{ position:'absolute',left:"20px" }} />
            {item.workspaceName}
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