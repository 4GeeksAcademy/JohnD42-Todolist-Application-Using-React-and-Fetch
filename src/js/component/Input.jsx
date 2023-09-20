import React from 'react'

const Input = (props) => {
    const input = props.input;
    const setInput = props.setInput;
    const addToDo = props.addToDo;
    const nextKey = props.nextKey;
    const setNextKey = props.setNextKey;

    return <input className="w-100 bordered pt-2 pb-2 p-4" type="text" onChange={e => setInput(e.target.value)} value={input} onKeyDown={addToDo}/>
}

export default Input