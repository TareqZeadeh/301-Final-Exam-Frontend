import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap'
import AllFlowers from './AllFlowers';
import { withAuth0 } from '@auth0/auth0-react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFlowers: [],
    }
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/allFlowers`)
      .then(result => {
        this.setState({
          allFlowers: result.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  addFlower =(Flower)=>{
    const {user}=this.props.auth0;
    const params = {
      email: user.email,
      fLowerObj: Flower
    }
    axios
    .post(`${process.env.REACT_APP_SERVER_URL}/addFlower`,params )
    .catch(err=>{console.log(err);})
  }

  render() {
    return (
      <>
        {this.state.allFlowers.length !==0 && this.state.allFlowers.map(flower =>{
         return <AllFlowers flower={flower} addFlower={this.addFlower}/>
        })}
      </>
    )
  }
}

export default withAuth0(Home);
