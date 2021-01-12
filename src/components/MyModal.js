import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            title: '',
            body: '',
            handler: ''
        }
    }
    handleClose = () => this.setState({ show: false });

    showModal = (cfg) => {
        cfg.show = true;
        this.setState(cfg);
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.body}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => {
                            this.state.handler();
                            this.setState({ show: false });
                        }}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}