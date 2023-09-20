import React from 'react'

const Footer = (props) => {
    const toDos = props.toDos;

    if (toDos.length > 1) {
        return (
            <li key='footer' className="d-flex w-100 justify-content-between bordered d-inline-block pt-2 pb-2 p-4 light-text">
                {`${toDos.length} items left`}
            </li>
        )
    }
    if (toDos.length === 1) {
        return (
            <li key='footer' className="d-flex w-100 justify-content-between bordered d-inline-block pt-2 pb-2 p-4 light-text">
                1 item left
            </li>
        )
    }
    if (toDos.length === 0) {
        return (
            <li key='footer' className="d-flex w-100 justify-content-between bordered d-inline-block pt-2 pb-2 p-4 light-text">
                No tasks, add a task
            </li>
        )
    }

}

export default Footer