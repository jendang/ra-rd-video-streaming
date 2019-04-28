import React from 'react'
import ReactDOM from 'react-dom'


const Modal = props => {
    return ReactDOM.createPortal(
        // ui dimmer modals visible active : background-full screen
        //ui standard modal visible active: the white box in middle
        <div 
            onClick={props.onDismiss}   // click outside of Modal box, it returns to Homepage
            className="ui dimmer modals visible active"
        > 
            <div 
                onClick={(e) => e.stopPropagation()} // prevent user click inside the Modal box and it return to Homepage
                className="ui standard modal visible active"
            >
                <div className="header">{props.title}</div>
                <div className="content">
                    <p>{props.content}</p>
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.getElementById("modal")

    )
}

export default Modal