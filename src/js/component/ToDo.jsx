import React from 'react'

const ToDo = (props) => {
    const label = props.label;
    const deleteToDo = props.deleteToDo;
    const id = props.id;

    return (
        <li key={id} className="d-flex w-100 justify-content-between bordered d-inline-block pt-2 pb-2 p-4" id={id}>
            {label}
            <i className="fa-solid fa-x" onClick={deleteToDo}></i>
        </li>
    )

}

export default ToDo