import logo from './logo.svg';
import './App.css';
import withSocket from "./withSocket"
import {Row,Col,Container, Card, Form, Button, ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({socketListen, socketSend}) {

    socketListen("consumerResponse", (response) => {
        console.log(`\nsocket listening to consumerResponse`)
        console.log(response)
    })

    console.log(`emitting socket 'messageFromApp' `)
    socketSend("messageFromApp", {name: "I am connected"})

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Container>
                        <Form>
                    <Row>
                    <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Request Rate</Form.Label>
                                <Form.Control type="text" placeholder="Message rate per second"/>
                            </Form.Group>
                    </Col>
                    <Col>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Simulation Time</Form.Label>
                                <Form.Control type="text" placeholder="Simulation time in seconds"/>
                            </Form.Group>
                    </Col>
                    <Col>
                            <Button variant="primary" type="submit">
                                Start simulation
                            </Button>
                    </Col>
                    </Row>
                        </Form>

                    <Row>
                            <ListGroup>
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                    </Row>
                </Container>
            </header>


        </div>
    );
}

export default withSocket(App);
