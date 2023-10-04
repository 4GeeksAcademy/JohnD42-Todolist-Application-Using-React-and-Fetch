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
			return todos
		} catch(error) {
			console.log('there was an error',error)
		}

	}

	useEffect( async () => {
		const toDoList = await getToDos()
		setNextKey(Math.max.apply(Math, toDoList.map((item) => item.id )) + 1)
		setToDos(toDoList)
		
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
				if(!resp.ok) {
					throw new Error ('error occurred',resp.status)
				}
				return resp.json(); 
			})
			.catch(error => {
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
				setToDos(toDos.concat([{done: false, label: input, id:nextKey}]))
				setInput('')
				setNextKey(Math.max.apply(Math, toDos.map((item) => item.id )) + 1);
			}
		}
	}

	const deleteToDo = (e) => {
		setToDos(toDos.filter(item => item.id != e.target.parentNode.id))
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
