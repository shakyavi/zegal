import React, { useState } from "react";

import logo from './logo.svg';
import './App.css';
import withSocket from "./withSocket"
import { Row, Container, Form, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App({ socketListen, socketSend }) {

    var sample = [
        { "message": "Tempor nulla esse occaecat deserunt cupidatat deserunt veniam excepteur.", "priority": 10, "timestamp": "2022-05-30T08:41:55.393Z" }, 
        { "message": "Aliqua commodo dolore exercitation dolore.", "priority": 4, "timestamp": "2022-05-30T08:41:55.393Z" }, 
        { "message": "Do nulla veniam ullamco anim aliqua mollit.", "priority": 4, "timestamp": "2022-05-30T08:41:55.393Z" }, 
        { "message": "Ea nulla ad magna pariatur dolore ullamco.", "priority": 8, "timestamp": "2022-05-30T08:41:55.393Z" }, 
        { "message": "Pariatur culpa duis consequat veniam qui velit est exercitation voluptate.", "priority": 8, "timestamp": "2022-05-30T08:41:55.393Z" }, 
        { "message": "Nisi occaecat officia aliqua reprehenderit magna sit.", "priority": 1, "timestamp": "2022-05-30T08:41:55.393Z" }, 
        { "message": "Velit amet magna laborum labore et pariatur minim fugiat.", "priority": 10, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Ex elit amet commodo commodo labore exercitation magna et.", "priority": 3, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Cillum Lorem sunt adipisicing eiusmod incididunt voluptate.", "priority": 1, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Duis elit cupidatat commodo excepteur nisi eiusmod quis nulla.", "priority": 6, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Minim culpa ex laborum minim.", "priority": 4, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Do non elit nisi enim.", "priority": 9, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Officia do deserunt amet.", "priority": 10, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Ex commodo sunt pariatur Lorem qui.", "priority": 9, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Tempor in aute est quis cillum nulla cupidatat dolor occaecat.", "priority": 6, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Velit nostrud aliqua id elit dolore tempor commodo velit voluptate.", "priority": 4, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Exercitation esse fugiat reprehenderit amet est ullamco incididunt in nisi.", "priority": 5, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Ea eiusmod id ipsum minim exercitation veniam mollit aute.", "priority": 6, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Labore excepteur id occaecat.", "priority": 4, "timestamp": "2022-05-30T08:41:55.393Z" }, { "message": "Id non do id in sunt culpa.", "priority": 1, "timestamp": "2022-05-30T08:41:55.393Z" }]
    var [messages, setMessages] = useState(0);

    socketListen("consumerResponse", (response) => {
        console.log(`\nsocket listening to consumerResponse`)
        console.log(response)
    })

    setTimeout(()=>{
        setMessages(sample)
    },5000)
    console.log(`emitting socket 'messageFromApp' `)
    //socketSend("messageFromApp", { name: "I am connected" })

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" style={{'height':'50px'}}/>
                <Container>
                    {/* <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Request Rate</Form.Label>
                                    <Form.Control type="text" placeholder="Message rate per second" />
                                </Form.Group>
                            </Col>
                            <Col>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Simulation Time</Form.Label>
                                    <Form.Control type="text" placeholder="Simulation time in seconds" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Start simulation
                                </Button>
                            </Col>
                        </Row>
                    </Form> */}
                    {messages.length > 0 &&
                        <Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Messages Received:</Form.Label>
                            <ListGroup style={{'height':'300px', 'overflow-y':'scroll'}} >
                                {messages.map(function (data, index) {
                                    
                                    return <ListGroup.Item eventKey={index}>
                                        <span style={{'align':'left','font-size':'20px'}}>#{index+1}</span> 
                                        <span style={{'text-align':'left','font-size':'20px'}}> Priority[{data.priority}] </span> 
                                        "{data.message}"
                                        <span style={{'font-size':'25px'}}> ({data.timestamp})</span>
                                    </ListGroup.Item>
                                    
                                })}
                            </ListGroup>
                                </Form.Group>
                        </Row>
                    }
                </Container>
            </header>
        </div>
    );
}
export default withSocket(App);
