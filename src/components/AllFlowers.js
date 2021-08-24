import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import { Card, Button } from 'react-bootstrap'

class allFlowers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>

                <Card style={{ width: '18rem', display: 'inline-block' }}>
                    <Card.Img variant="top" src={this.props.flower.photo} />
                    <Card.Body>
                        <Card.Title>{this.props.flower.name}</Card.Title>
                        <Card.Text>
                            {this.props.flower.instructions}
                        </Card.Text>
                        <Button onClick={()=>{this.props.addFlower(this.props.flower)}} variant="primary">Add To Fav</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default allFlowers;

