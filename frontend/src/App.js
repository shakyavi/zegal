import React, { useState } from "react";

import logo from './logo.svg';
import './App.css';
import withSocket from "./withSocket"
import { Row, Container, Form, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App({ socketListen, socketSend }) {
    var [messages, setMessages] = useState([]);

    socketListen("consumerResponse", (response) => {
        console.log(`\nsocketListen to consumerResponse`)
        setMessages([...messages,response])
        console.log(response)
    })

    console.log(`emitting socket 'messageFromApp' `)
    socketSend("messageFromApp", { name: "I am connected" })

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" style={{'height':'50px'}}/>
                <Container>
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
