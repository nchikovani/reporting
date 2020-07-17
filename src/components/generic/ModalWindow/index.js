import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, Modal} from '@material-ui/core';
import './style.scss';
import store from '../../../store';
import {closeModal} from '../../../actions';
import CloseIcon from '@material-ui/icons/Close';

function ModalWindow ({open, body}){

    return (
        <Modal
            open={open}
            onClose={()=>store.dispatch(closeModal())}
        >
            <div className="modal-window">
                <IconButton
                    edge="start"
                    className="close-modal"
                    onClick={()=>store.dispatch(closeModal())}
                >
                    <CloseIcon />
                </IconButton>
                <div className="modal__body">
                    {body}
                </div>
            </div>
        </Modal>
    )

}
ModalWindow.propTyeps = {
    open: PropTypes.bool,
    body: PropTypes.element,
}
export default ModalWindow;