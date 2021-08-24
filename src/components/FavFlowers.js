import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import UpdateForm from './UpdateForm';
class FavFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFlowers: [],
      index : -1,
      toShow : false,
      flowerObj : {},
    }
  }

  componentDidMount() {
    const { user } = this.props.auth0;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/userFlowers`, { params: { email: user.email } })
      .then(result => {
        this.setState({
          userFlowers: result.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteFlower=(idx)=>{
    const { user } = this.props.auth0;
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/deleteFlower/${idx}`, { params: { email: user.email } })
      .then(result => {
        this.setState({
          userFlowers: result.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateFlower = (flower,idx)=>{
    this.setState({
      index : idx,
      toShow : true,
      flowerObj :flower,
    })
  }

  closeHadel = ()=>{
    this.setState({
      toShow : false,
    })
  }
  updateUserFlowers = (Flowers)=>{
    axios
    .put(`${process.env.REACT_APP_SERVER_URL}/updateFlower/${this.state.index}`, Flowers)
    .then(result => {
        this.setState({
          userFlowers: result.data
        })
      })
      .catch(err => {
        console.log(err);
      })
      

  }

  render() {
    return (
      <>
        {this.state.userFlowers.length !== 0 && this.state.userFlowers.map((flower, idx) => {
          return (
            <>
              <Card style={{ width: '18rem', display: 'inline-block' }}>
                <Card.Img variant="top" src={flower.photo} />
                <Card.Body>
                  <Card.Title>{flower.name}</Card.Title>
                  <Card.Text>
                    {flower.instructions}
                  </Card.Text>
                  <Button onClick={() => {this.deleteFlower(idx) }} variant="danger">Delete</Button>
                  <Button onClick={() => {this.updateFlower(flower,idx) }} variant="warning">Update</Button>
                </Card.Body>
              </Card>

            </>
          )
        })}

        {this.state.toShow && <UpdateForm index ={this.state.index}  toShow={this.state.toShow} flowerObj={this.state.flowerObj} closeHadel={this.closeHadel}  updateUserFlowers={this.updateUserFlowers} />}
      </>
    )
  }
}

export default withAuth0(FavFlowers);
