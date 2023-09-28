import React from "react";
import { useState, useEffect } from 'react'
import Input from '../component/Input.jsx'
import ToDo from '../component/ToDo.jsx'
import Footer from '../component/Footer.jsx'

const Home = () => {
	const [input, setInput] = useState('')
	const [toDos, setToDos] = useState([])
	const [nextKey, setNextKey] = useState(1)

	const url = 'https://playground.4geeks.com/apis/fake/todos/user/jdurtka'

	const getToDos = async () => {
		const response = await fetch(url);
		const todos = await response.json();
		try {
			if(!response.ok) {
				throw new Error('there was an error', response.status)
			}
			console.log(todos)
			return todos
		} catch(error) {
			console.log('there was an error',error)
		}

	}

	useEffect( async () => {
		const toDoList = await getToDos()
		const list = toDoList.map((todo) => { 
			return {done: false, id: todo.id, label: todo.label} })
		let max = -99999
		list.map(obj => {
			if (obj.id > max) {
				max = obj.id
			}})
		setNextKey(max + 1)
		console.log(list)
		setToDos(list)
		},[])

	const updateAPIToDos = () => {
		let max = -99999
		toDos.map(obj => {
			if (obj.id > max) {
				max = obj.id
			}
		setNextKey(max + 1)
		fetch('https://playground.4geeks.com/apis/fake/todos/user/jdurtka', {
			method: "PUT",
			body: JSON.stringify(toDos),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is where your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
		})
	}

	useEffect(() => {
		updateAPIToDos()
	},[toDos])
	const addToDo = (e) => {
		if(e.key === 'Enter') {
			if(input !== '') {
				console.log('running addToDo')
				setToDos(toDos.concat([{done: false, label: input, id:nextKey}]))
				setInput('')
				setNextKey(nextKey + 1);
			}
		}
	}

	const deleteToDo = (e) => {
		console.log('running deleteToDo')
		setToDos(toDos.filter(item => {
			if (`${item.label}<i class="fa-solid fa-x"></i>` !== e.target.parentNode.innerHTML) {
			return item
		}
		}))
		setNextKey(nextKey - 1);
	}

	return (
		<div className="text-center">
			<h1 className="display-1">todos</h1>
			<div className="row">
				<div className="bordered col-2 mx-auto g-0 list">
					<Input input={input} setInput={setInput} addToDo={addToDo}/>
					<ul>
						{toDos.map(todo => <ToDo label={todo.label} id={todo.id} deleteToDo={deleteToDo}/>)}
						<Footer toDos={toDos}/>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
