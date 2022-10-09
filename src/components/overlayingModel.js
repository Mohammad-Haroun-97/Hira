import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";
import "./addForm.css";
import { AiFillCloseSquare } from "react-icons/ai";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function CreateForm(props) {
  const { addTaskHandler,workspaceId } = props;
  const [title,setTitle]=useState('')
  const [status,setStatus]=useState('backlog')
  const [description,setDescription]=useState('')
  const [assignedUsers,setAssignedUsers]=useState([])
  const [selectedUsers,setSelectedUsers]=useState([])


  useEffect(() => {
    getUsers()
  }, [])
 async function getUsers() {
    let allTasks= await axios.get('https://630c9dd853a833c534300ae2.mockapi.io/users')
    let usersForWorkspace=[]


for (let i = 0; i < allTasks.data.length; i++) {
if (allTasks.data[i].workspaces ===workspaceId) {
  usersForWorkspace.push(allTasks.data[i].userName)
}}
setAssignedUsers(usersForWorkspace)
    
  }
  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  // useEffect(() => {
  //   const image_input = document.querySelector("#image-input");
  //   image_input.addEventListener("change", function() {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => {
  //     const uploaded_image = reader.result;
  //     // setImage(uploaded_image)
  //   //   document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  //     });
  //     reader.readAsDataURL(this.files[0]);
  //   });
  // }, [])
  




  async function addTaskSubmiter(e) {
    e.preventDefault()

    try {
        await axios.post('https://630c9dd853a833c534300ae2.mockapi.io/tasks',{status,title,assignedUsers:selectedUsers,description,workspaceId,taskId:uuidv4()})
        addTaskHandler()
    } catch (error) {
        console.log("errorerror",error);
    }


  }



  return (
    <>
      <div className="overLayingPage">
        <div className="createForm">
          <AiFillCloseSquare
            className="closeIcon"
            onClick={() => addTaskHandler()}
          />
          <form onSubmit={addTaskSubmiter}>
            <div className="formContainer">
              <div className="rowInputs">
                <label>Title :</label>
                <input value={title} onChange={(event)=>{setTitle(event.target.value)}} type={"text"} />
                <label  style={{paddingLeft:'30px'}} >status :</label>
                <select onChange={(event)=>{setStatus(()=> event.target.value)}} value={status}>
                  <option value="backlog">Backlog</option>
                  <option value="toDo">To Do</option>
                  <option value="onProgress">On progress</option>
                  <option value="done">Done</option>
                </select>
             
          
              </div>

              <div className="rowInputs">
             <label style={{paddingTop:"30px"}}>Assigned To :</label> 
          
                   <FormControl sx={{ m: 1, width:200 }}>
        <InputLabel id="demo-multiple-chip-label">Users</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedUsers}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ position: 'absolute',left:"105%",top:-10, width:'350px' }}>
              <Box sx={{ display: 'flex',flexWrap:"wrap",  gap: 0.5 }}>
              {selected.map((value,index) => (
                <>
                <div>
               {index <7 && <Chip sx={{  width:'70px' }} key={value} label={value} />}
               </div>
                 <div >
               {index === 7 && <p style={{paddingBottom:"50px"}}>.......</p>}
               </div>
               </>
              ))}
              </Box>
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {assignedUsers?.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     {assignedUsers?.length ===0 &&   <div>
        <p>Please select users</p>
      </div>}
              </div>
              <div className="rowInputs">
              <label>Description :</label>
              <input value={description} onChange={(event)=>{setDescription(event.target.value)}} className="descriptionStyle" type={"textArea"} />
              </div>
            </div>
            <button className="submitBtn" type="submit">Add Task</button>
          </form>
          {/* <input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg"/> */}


{/* <div id="display-image" ></div> */}
        </div>
 

      </div>
    </>
  );
}
ReactDOM.createPortal(
  <CreateForm />,
  document.getElementById("overLayingModel")
);

export default CreateForm;
