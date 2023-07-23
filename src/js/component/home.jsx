
import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {


//Add a new task to the list

const [list,setList] =useState ([])
const [inputValue,setInputValue]= useState('');
const url ='"https://assets.breatheco.de/apis/fake/todos/user/dnumon"'




const fetchTask = async () => {

		const response = await fetch(url,{
			method:'POST',
			body:JSON.stringnify([]),
			headers:{
				"Content-Type":"application/json"
			}
		})
		const data= await response.json()
		console.log (data)		
}

useEffect(()=>{
fetchList ()
},[])

useEffect (()=>{
	updateList ()
},[list])

const fetchList = async () => {
try{
	const response =await fetch (url)
	const data =await response.json ()
	console.log(data)
	setList (data)

} catch (error){
	console.log (error)
}
}

const updateList = async () => {
	try {
		const response =await fetch(url,{
			method:"PUT",
			body:JSON.stringify(list),
			headers: {
				"Content-Type":"application/json"
			}
		})
		const data =await response.json()
	}
	catch (error){
		console.log(error)
	}
}


const handleKeyPress = (event) =>{
if (event.key === 'Enter'){
	//Create a new task object with the title and completed properties
	const newTaskObject ={
		title:inputValue,
		completed:false,
	};
	//Create a copy of the current task list an add the new task
	const newList = [...list,newTaskObject];
	setList (newList)
	//Clear the input field after adding the task
	setInputValue("");

}

};

const handleClick = (index) =>{
	let finalTask =list.filter((task,idx)=> idx!==index);
	setList(finalTask);
};



	return (
<div className="card" >
  <ul className="list-group list-group-flush">
    <li className="list-group-item">
		<input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} placeholder="What need to be done?"/> 
		</li>

{list.map((task,index)=> (
	<li key = {index} className="list-group-item">
		{task.title}{" "} <button onClick={()=>handleClick(index)} > x </button>
	</li>
))}

   
  </ul>
  
</div>
	
	);
};

export default Home;
