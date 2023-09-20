import React from "react";
import { useState } from 'react'
//include images into your bundle
import Input from '../component/Input.jsx'
import ToDo from '../component/ToDo.jsx'
import Footer from '../component/Footer.jsx'

//create your first component
const Home = () => {
	const [input, setInput] = useState('')
	const [toDos, setToDos] = useState([])
	const [nextKey, setNextKey] = useState(0)

	const addToDo = (e) => {
		if(e.key === 'Enter') {
			if(input !== '') {
				setToDos(toDos.concat([<ToDo value={input} deleteToDo={deleteToDo} listKey={nextKey}/>]))
				setInput('')
				setNextKey(toDos.length)
			}
		}
	}

	const deleteToDo = (e) => {
		e.target.parentNode.remove()
		setNextKey(toDos.length)
	}

	return (
		<div className="text-center">
			<h1 className="display-1">todos</h1>
			<div className="row">
				<div className="bordered col-2 mx-auto g-0 list">
					<Input input={input} setInput={setInput} addToDo={addToDo} toDos={toDos} nextKey={nextKey} setNextKey={setNextKey}/>
					<ul>
						{toDos.map((toDo) => toDo)}
						<Footer toDos={toDos}/>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
