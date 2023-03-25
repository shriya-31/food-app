import classes from "./Modal.module.css"
import ReactDOM from 'react-dom'

function Backdrop(props){
    return(
        <div className={classes.backdrop} onClick={props.onBackdropClick}></div>
    )
}

function ModalOverlay(props){
    return(
    <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>)
}

const portalLocation = document.getElementById("overlays");

export default function Modal(props){
    return (
      <>
        {ReactDOM.createPortal(<Backdrop onBackdropClick={props.onClose}/>, portalLocation)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalLocation)}
      </>
    );
}