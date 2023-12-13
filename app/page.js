"use client"
import React, {useState} from 'react';
import './components/header.css';

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, seteditIndex] =useState(-1);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if(editIndex>=0){
      const updatedTask={ ...mainTask[editIndex], title, desc };
      const updatedTasks=[...mainTask];
      updatedTasks.splice(editIndex,1,updatedTask);
      setMainTask(updatedTasks);
      seteditIndex(-1);
    }
    else{
      setMainTask([...mainTask, {title, desc}]);
    }
    settitle("");
    setdesc("");
    console.log(mainTask);
  };

  const deleteHandler = (i) =>{
    let copytask=[...mainTask];
    copytask.splice(i,1);
    setMainTask(copytask);
  }

  const editHandler = (i) =>{
    settitle(mainTask[i].title);
    setdesc(mainTask[i].desc);
    seteditIndex(i);
  }

  let renderTask=<h2>No Task Available</h2>
  
  if(mainTask.length>0){
    renderTask=mainTask.map((task,index)=>{
      return(
        <li key={index} className='listelem'>
          <div className='listdiv'>
          <h1 className='text-bold text-3xl'>{index+1}</h1>
            <h2>
              {editIndex === index ? (
              <input
                type="text"
                value={title}
                onChange={(e)=>settitle(e.target.value)}
              />):(
                task.title
                )}  
            </h2>
            <p>
              {editIndex=== index ? (
              <input
                type="text"
                value={desc}
                onChange={(e)=>setdesc(e.target.value)}
              />):(
                task.desc
                )}
            </p>
          </div>
          
          <div className='btbox'>
            {editIndex!==index && (
              <button onClick={()=>editHandler(index)} className='edit'
              >Edit
              </button>
            )}
            <button onClick={()=>{
              if(editIndex===index){
                seteditIndex(-1);
                settitle("");
                setdesc("");
              }
              else{
                deleteHandler(index);
              }
            }} 
            className='delete'>{editIndex===index ? "Cancel" : "Delete"}</button>
        
          </div>

          </li>
      )
    })
  }

  return(
    <>
    <div className='bg'>
    <div className='header'>
    <h1 className='todolist'>Avinash's ToDo List</h1>
      <form className='form' onSubmit={submitHandler}>
        <input type='text' 
               className='title' 
               placeholder='Title'
               value={title}
               onChange={(e) => settitle(e.target.value)} />
        <input className='desc' 
               placeholder='Description' 
               value={desc}
               onChange={(e)=>setdesc(e.target.value)} />
        <button className='submitbutton'>{editIndex>=0 ? "Update Task" : "Add Task"}</button>
      </form>
      <div className='activitybar'>
        <h1 className='text-2xl text-bold ml-5'>Items</h1>
          {renderTask}
        </div>
    </div>
      
       
    </div>
    </>
  )

}

export default page;