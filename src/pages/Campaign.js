import { BsFillPlusSquareFill } from 'react-icons/bs';
import "../pages/CampaignStyle.css"
import {useEffect,useState} from 'react'
import axios from 'axios'
import CreateTaskForm from '../components/overlayingModel'
import { useParams,useNavigate } from "react-router-dom";


function Campaign() {
  const navigate=useNavigate()
  const {workspaceId} = useParams();
  console.log("7777777777777777",workspaceId);
  const [backlogItems,setBacklogItems]=useState([])
  const [toDoItems,setToDoItems]=useState([])
  const [onProgressItems,setOnProgressItems]=useState([])
  const [doneItems,setDoneItems]=useState([])
  const [allTasks,setAllTasks]=useState([])
  const [changeData,setChangeData]=useState(false)
  const [addTaskFlag ,setAddTaskFlag]=useState(false)





  
useEffect(() => {
  const windowContainer=document.querySelector('.windowPage')
  const backlogContainer=document.querySelector('.BacklogCol')
  const toDoContainer=document.querySelector('.toDoCol')
  const OnProgressContainer=document.querySelector('.onProgressCol')
  const DoneContainer=document.querySelector('.doneCol')

  windowContainer.addEventListener('drop',dropWindowHandler)

  backlogContainer.addEventListener('dragover',dragOver)
  backlogContainer.addEventListener('drop',dropBacklogHandler)
  
  toDoContainer.addEventListener('dragover',dragOver)
  toDoContainer.addEventListener('drop',dropToDoHandler)
  
  OnProgressContainer.addEventListener('dragover',dragOver)
  OnProgressContainer.addEventListener('drop',dropOnProgressHandler)
  
  DoneContainer.addEventListener('dragover',dragOver)
  DoneContainer.addEventListener('drop',dropDoneHandler)
}, [doneItems,onProgressItems,backlogItems,toDoItems])


useEffect( () => {
 getAllDataBackend()
}, [addTaskFlag])
useEffect(() => {
getAddEvents()
}, [doneItems,onProgressItems,backlogItems,toDoItems])

useEffect(() => {
  console.log("ffffffffffffffffffffffffffff");
  const backlogItemsArr=allTasks?.filter(item=>item.status == "backlog" )
  setBacklogItems(()=>backlogItemsArr)
  /////To Do////
  const toDoItemsArr=allTasks?.filter(item=>item.status=="toDo")
  setToDoItems(()=>toDoItemsArr)
  /////On Progress////
  const onProgressItemsArr=allTasks?.filter(item=>item.status=="onProgress")
  setOnProgressItems(()=>onProgressItemsArr)
  /////Done ////
  const doneItemsArr=allTasks?.filter(item=>item.status=="done")
  setDoneItems(()=>doneItemsArr)

}, [allTasks])


async function getAllDataBackend() {
  let data=await axios.get('https://630c9dd853a833c534300ae2.mockapi.io/tasks')
  console.log("datadatadata",data.data);
  let allData=data.data
  let workspaceTasks=[]
  for (let i = 0; i < allData.length; i++) {
if (allData[i].workspaceId===workspaceId) {
  workspaceTasks.push(allData[i])
}
    
  }
  setAllTasks(workspaceTasks)

}


async function getAddEvents() {

  const backlogElements=document.querySelectorAll('.cardsBacklog')
  const toDoElements=document.querySelectorAll('.cardsToDo')
  const onProgressElements=document.querySelectorAll('.cardsOnProgress')
  const DoneElements=document.querySelectorAll('.cardsDone')
  
  for (let i = 0; i < backlogElements.length; i++) {
  backlogElements[i].addEventListener('dragstart',dragStart)
  backlogElements[i].addEventListener('dragend',dragend)

  }
  
  for (let i = 0; i < toDoElements.length; i++) {
    toDoElements[i].addEventListener('dragstart',dragStart)
    toDoElements[i].addEventListener('dragend',dragend)
  
    }
  
  for (let i = 0; i < onProgressElements.length; i++) {
    onProgressElements[i].addEventListener('dragstart',dragStart)
    onProgressElements[i].addEventListener('dragend',dragend)

      }
  for (let i = 0; i < DoneElements.length; i++) {
    DoneElements[i].addEventListener('dragstart',dragStart)
    DoneElements[i].addEventListener('dragend',dragend)

        }
}
let dragItem=null
let startingObject={
  id:null,
  status:''
}



function dragStart() {
  dragItem=this
  startingObject={id:dragItem.id,status:dragItem.status}
  console.log('starrrrrrrrrrrt',dragItem);
  console.log('startingObjectstartingObject',startingObject);

}

function dragend() {
  if (dragItem.status ===undefined) {
    return
  }
 console.log('befoooooooore end',dragItem.status);
 setAllTasks((prevArr)=>{
  let editiedArr=[]
  for (let i = 0; i < prevArr.length; i++) {
   if (prevArr[i].taskId==startingObject.id) {
    prevArr[i].status=`${dragItem.status}`
    editiedArr.push(prevArr[i])
   }else{
    editiedArr.push(prevArr[i])
   }
  
  }
  return editiedArr
 })
}

function dragOver(e) {
  e.preventDefault()

}

function dropWindowHandler() {
  console.log("haroun touch the windowwwwwwwwwwww");
}
 async function dropBacklogHandler() {
  if (dragItem) {

    console.log('droppppppppp',dragItem);
    dragItem.className='cardsBacklog'
    dragItem.status='backlog'
    setChangeData(!changeData)

    const itemObject=allTasks.find(item=>item.taskId==dragItem.id)
  
    await axios.put(`https://630c9dd853a833c534300ae2.mockapi.io/tasks/${itemObject.id}`,{...itemObject,status:'backlog'})


  //  this.append(dragItem)
   dragItem=null
  }


}
async function dropToDoHandler() {
  if (dragItem) {
    dragItem.className='cardsToDo'
  dragItem.status='toDo'
  setChangeData(!changeData)

  const itemObject=allTasks.find(item=>item.taskId==dragItem.id)
  try {
    await axios.put(`https://630c9dd853a833c534300ae2.mockapi.io/tasks/${itemObject.id}`,{...itemObject,status:'toDo'})
  } catch (error) {
    console.log("errorerror",error);
  }

  // this.append(dragItem)
  dragItem=null
}
}
  
async function dropOnProgressHandler() {
  if (dragItem) {
    dragItem.className='cardsOnProgress'
  dragItem.status='onProgress'
  setChangeData(!changeData)

  const itemObject=allTasks.find(item=>item.taskId==dragItem.id)
  try {
    await axios.put(`https://630c9dd853a833c534300ae2.mockapi.io/tasks/${itemObject.id}`,{...itemObject,status:'onProgress'})
  } catch (error) {
    console.log("errorerror",error);
  }
  // this.append(dragItem)
  dragItem=null
    
  }
}
async function dropDoneHandler() {
  if (dragItem) {
    dragItem.className='cardsDone'
    dragItem.status='done'
    setChangeData(!changeData)
    const itemObject=allTasks.find(item=>item.taskId==dragItem.id)
    try {
      await axios.put(`https://630c9dd853a833c534300ae2.mockapi.io/tasks/${itemObject.id}`,{...itemObject,status:'done'})
    } catch (error) {
      console.log("errorerror",error);
    }
    // this.append(dragItem)
    dragItem=null
    
  }
}
function addTaskHandler() {
  setAddTaskFlag(!addTaskFlag)
}


  return(
    <>
    <div className='windowPage'>
    <div style={{cursor:'pointer',display:'block',margin:'auto',width: '10%'}} onClick={()=>navigate('/Hira')}>
    <h1 className='projectTitle'>Hira</h1>
    </div>
    <div className='createDiv'>
      <p className='createHeading'> Create Task</p> 
    <BsFillPlusSquareFill onClick={addTaskHandler} className='addIcon'/>
       </div>
     {addTaskFlag &&  <CreateTaskForm workspaceId={workspaceId} addTaskHandler={addTaskHandler}/>}
<div className='parent'>
<div className='BacklogCol' >
  <div className='adv-round-rectangle Backlog'><h2 className='headings'>Backlog</h2></div>
{backlogItems?.map(item=>
<div key={item.taskId} id={item.taskId}  draggable={true} className='cardsBacklog'> 
<h5>{item.title}</h5>
<h5>{item.status}</h5>
<h5>{item.taskId}</h5>
</div>
)}
     </div>
     <div className='toDoCol' >
     <div className='adv-round-rectangle ToDo'><h2 className='headings'>To Do</h2></div>

     {toDoItems?.map(item=>
<div key={item.taskId} id={item.taskId}  draggable={true} className='cardsToDo'> 
<h5>{item.title}</h5>
<h5>{item.status}</h5>
<h5>{item.taskId}</h5>

</div>
)}
      </div>
      <div className='onProgressCol'>
      <div className='adv-round-rectangle Progress'><h2 className='headings'>On Progress</h2></div>

      {onProgressItems?.map(item=>
<div key={item.taskId} id={item.taskId}   draggable={true} className='cardsOnProgress'> 
<div className='content'>
<h5 className='title'>{item.title.toUpperCase() }</h5>

  <div className='statusCircle'> </div>
<p  className='status'>{item.status.slice(0,2) + " "+ item.status.slice(2).toLowerCase()}</p>


</div>


</div>
)}
      
      </div>
      <div className='doneCol'>
      <div className='adv-round-rectangle Done'><h2 className='headings'>Done</h2></div>

{doneItems?.map(item=>
<div key={item.taskId} id={item.taskId}  draggable={true} className='cardsDone'> 
<h5>{item.title}</h5>
<h5>{item.status}</h5>
<h5>{item.taskId}</h5>
</div>
)}
      </div>
      </div>
      </div>
    </>
  )


}

export default Campaign;
