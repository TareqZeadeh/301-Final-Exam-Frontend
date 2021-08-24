import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap'
class UpdateForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
           

        }
    }
submitHandler=(event)=>{
    event.preventDefault();
    const { user } = this.props.auth0;
    const name =event.target.flower.value;
    const photo =event.target.photo.value;
    const instructions =event.target.instructions.value;

    const newFlower={
        instructions:instructions,
        photo: photo,
        name : name,
    }

    const params ={
        email:user.email,
        fLowerObj : newFlower,
    }

    this.props.updateUserFlowers(params);
      this.props.closeHadel();
}

    render() {
        return (
            <>

               {this.props.toShow && <Modal show={this.props.toShow} onHide={()=>{this.props.closeHadel()}}>
                    <Modal.Body>
                        <Form onSubmit = {this.submitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label>Name</Form.Label>

                                <Form.Control type="text" name='flower' defaultValue={this.props.flowerObj.name}/>
                                
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Photo</Form.Label>
                                <Form.Control type="text" name='photo' defaultValue={this.props.flowerObj.photo} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Instructions</Form.Label>
                                <Form.Control type="text" name='instructions' defaultValue={this.props.flowerObj.instructions} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{this.props.closeHadel()}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>}
            </>
        )
    }

}
export default withAuth0(UpdateForm);