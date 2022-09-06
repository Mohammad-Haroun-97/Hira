import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import { AiFillCloseSquare } from "react-icons/ai";
import {TextField,Button} from '@mui/material';
import authWorkspaceStyle from './authWorkspaceStyle.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function CampaignAuthPop(props) {
    const navigate = useNavigate()

    const {workspaceAuthHandler,workspaceId}=props
    const [username,setUsername]=useState('')
    const [workspaceKey,setWorkspaceKey]=useState('')
    const [isAuthinticated,setIsAuthinticated]=useState(false)


    function usernameHandler(event) {
        setUsername(event.target.value)
    }

    function WorkspaceKeyHandler(event) {
        setWorkspaceKey(event.target.value)
    }

    async function campaignAuthHandler() {

        try {
    let allWorkspaces= await axios.get('https://630c9dd853a833c534300ae2.mockapi.io/Workspaces')
    for (let i = 0; i < allWorkspaces.data.length; i++) {
if (allWorkspaces.data[i].workspaceID===workspaceId) {
    let userExist= allWorkspaces.data[i].workspaceUsers.find((item)=>item.username===username)
    setIsAuthinticated(!(allWorkspaces.data[i].workspaceKey===workspaceKey && userExist))
  if (  allWorkspaces.data[i].workspaceKey===workspaceKey && userExist ) {
navigate(`/Campaign/${workspaceId}`)
    
  }
   }
        
    }
            
        } catch (error) {
            console.log("errorerror",error);
        }
        
    }
    

    return (
    <>

      <div className="overLayingPage">
      <div className="createForm authWorkspace">
      <AiFillCloseSquare className="closeIcon" onClick={() => workspaceAuthHandler()}/>
      <TextField
          error={isAuthinticated}
          id="outlined-error"
          label="Username"
          size='large'
          fullWidth
          onChange={usernameHandler}
          value={username}
          margin="normal"
          sx={{ml:5,pr:5,width:'80%',mt:4}}
        />
          <TextField
          error={isAuthinticated}
          id="outlined-error"
          label="Workspace Key"
          fullWidth
          type="password"
          onChange={WorkspaceKeyHandler}
          value={workspaceKey}
          margin="normal"
          sx={{ml:5,pr:5,width:'80%'}}
        />

{isAuthinticated &&<p style={{textAlign:'center',color:'red'}}> Username or workspace Key is wrong</p>}

     <Button onClick={campaignAuthHandler} sx={{position:'absolute',right:30,bottom:15}} variant="contained">Go!</Button>

      </div>
      </div>
        

    </>
    )
}



export default CampaignAuthPop
ReactDOM.createPortal(<CampaignAuthPop/>,document.getElementById('overLayingModel'))