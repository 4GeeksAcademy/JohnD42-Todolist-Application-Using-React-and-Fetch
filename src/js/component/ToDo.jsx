import React from 'react'

const ToDo = (props) => {
    const value = props.value;
    const deleteToDo = props.deleteToDo;
    const key = props.listKey;
    return (
        <li key={key} className="d-flex w-100 justify-content-between bordered d-inline-block pt-2 pb-2 p-4">
            {value}
            <i className="fa-solid fa-x" onClick={deleteToDo}></i>
        </li>
    )

}

export default ToDo