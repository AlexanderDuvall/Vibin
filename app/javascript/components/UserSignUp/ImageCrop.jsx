import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Modal, Button} from 'react-bootstrap'

class ImageCrop extends React.Component{
    //const [isOpen, setIsOpen] = React.useState(false);
    render() {
        return(
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>Hi</Modal.Header>
                <Modal.Body>asdfasdf</Modal.Body>
                <Modal.Footer>This is the footer</Modal.Footer>
            </Modal>
        );
    }
}

const showModal = () => {
    setIsOpen(true);
};

const hideModal = () => {
    setIsOpen(false);
};

