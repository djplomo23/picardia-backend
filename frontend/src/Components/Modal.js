import React from 'react'


const Modal = (props) =>{
    const {visible, setVisible, deleteHandler, product, text, name} = props

    return (<div className={visible ? 'visible ' : 'modal '} >
  <div className="modal-dialog " role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{name}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>{text}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={() => deleteHandler(product)} >Confirmar</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setVisible(false)}>Cerrar</button>
      </div> 
    </div>
  </div>
</div>)
}

export default Modal