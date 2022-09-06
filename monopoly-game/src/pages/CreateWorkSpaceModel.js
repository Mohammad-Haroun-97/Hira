import React,{useState,useEffect,useCallback} from "react";
import  ReactDOM  from "react-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import {Box,Chip,Stepper,Step,StepLabel ,Button,Typography,TextField,Stack,Avatar} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'



function CreateWorkSpaceModel(props) {
    const {openCreateWorkspace,workspaceType}=props
    const steps = ['Workspace Creation', 'Add Users','Finished'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [workspaceName,setWorkspaceName]=useState('')
    const [workspaceKey,setWorkspaceKey]=useState('')
    const [workspaceId,setWorkspaceId]=useState('')
    const [addUser,setAddUser]=useState([])
    const [userInfo,setUserInfo]=useState({username:'',userImage:'',userId:""})






    useEffect(() => {
      setWorkspaceId(uuidv4())
      setWorkspaceName('')
      setWorkspaceKey('')
    }, [])
    

    
  


  const handleNext = async() => {

if (activeStep===2) {
await axios.post("https://630c9dd853a833c534300ae2.mockapi.io/Workspaces",{
  workspaceID: workspaceId,
 workspaceKey,
 workspaceName,
 workspaceUsers:addUser,
 workspaceType
})
for (let i = 0; i < addUser.length; i++) {
  await axios.post("https://630c9dd853a833c534300ae2.mockapi.io/users",{
    "userId": addUser[i].userId,
    "workspaces": workspaceId,
    "userImage": addUser[i].userImage,
    "userName": addUser[i].username,
   })}
   openCreateWorkspace()
   return}


  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const workspaceNameHandler=(event)=>{
    setWorkspaceName(event.target.value)
  }
  const workspaceKeyHandler=(event)=>{
    setWorkspaceKey(event.target.value)
  }

  const userInfoHandler=(event)=>{
    if (event.target.name==="username") {
      if (userInfo.userId==="") {
        setUserInfo((prev)=>{return {...prev,userId:uuidv4()}})
      }
    setUserInfo((prev)=> {return {...prev,username:event.target.value}})
    }else{
      if (userInfo.userId==="") {
        setUserInfo((prev)=>{return {...prev,userId:uuidv4()}})
      }
    setUserInfo((prev)=> {return {...prev,userImage:event.target.value}})

    }
  }


  function addMoreUsers(payload) {
  
    setAddUser((prev)=>{return [...prev,payload]})
    setUserInfo({username:'',userImage:'',userId:""})
  }


    return(
        <>
        <div className="overLayingPage">
            <div className="createForm">
            <AiFillCloseSquare
            className="closeIcon"
            onClick={() => openCreateWorkspace()}
          />
          <Box style={{paddingTop:'50px'}} sx={{ width: '80%',ml:7 }}>
          <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
  
          return (
            <Step key={label} >
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
        
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />

          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
        {activeStep === 0 &&  <Typography sx={{ width:'100%',height:'150px',backgroundColor: '#E1FFEE',boxShadow:'5',mt:4 }}>
        <TextField
          required
          id="outlined-required"
          label="Workspace Name"
          size="small"
          color="warning"
          sx={{backgroundColor:'white',m:2,ml:5,width:'80%'}}
          value={workspaceName}
          onChange={workspaceNameHandler}
          
        />
            <TextField
          required
          id="outlined-required"
          label="Workspace key"
          type="password"
          size="small"
          color="warning"
          value={workspaceKey}
          onChange={workspaceKeyHandler}
          sx={{backgroundColor:'white',ml:5,width:'80%'}}
        />
          </Typography>}
          {activeStep === 1 &&  <Typography sx={{ width:'100%',backgroundColor: '#E1FFEE',boxShadow:'5',mt:4 }}>
          <TextField
          required
          id="username"
          label="Username"
          type="text"
          name="username"
          size="small"
          color="warning"
          value={userInfo.username}
          onChange={userInfoHandler}
          sx={{backgroundColor:'white',m:2,ml:5,width:'80%'}}
        />
        <div>
        <label style={{marginLeft:'50px',fontFamily:"serif"}}       id="userIcon" htmlFor="userIcon" >User Image</label>
<TextField
          required
          id="userImage"
         name="userImage"
          type="file"
          size="small"
          color="warning"
          value={userInfo.userImage}
          onChange={userInfoHandler}
          sx={{backgroundColor:'white',ml:5,width:'56%'}}
        />
        <Stack sx={{ mt: 2 }} direction="row" spacing={2}>
        <Button  onClick={()=> addMoreUsers(userInfo)}>Add User</Button>
        {addUser.map((item)=>
        <Chip color="primary" avatar={<Avatar>{item.username.slice(0,1).toUpperCase()}</Avatar>} label={item.username} sx={{width:'90px'}} variant="outlined" />)}
        </Stack>

</div>
          </Typography>}
          {activeStep === 2 &&  <Typography sx={{ width:'100%',height:'150px',backgroundColor: '#E1FFEE',boxShadow:'5',mt:4}}>
          <div style={{padding:'10px'}}  >
          <h2 style={{textAlign:'center',fontSize:'15px'}} >Thank you, you almost finished</h2>
          <p>We’re constantly developing new technologies and features to improve our services</p>
          </div>
          </Typography>}
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button disabled={activeStep ===0?!(workspaceName&&workspaceKey):!(addUser.length)} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>


            </div>
        </div>
        </>
    )
}

ReactDOM.createPortal(<CreateWorkSpaceModel/>,document.getElementById( 'overLayingModel'))
export default CreateWorkSpaceModel