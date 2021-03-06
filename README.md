# zegal

## DESCRIPTION 
This repository contains code to simulate a high-volume data input environment. It basically has four major components:
- A Message Queue (RabbitMQ)
- NodeJs backend to publish messages
- NodeJs backend to subscribe and filter out messages and send to front end via Socket.IO
- A React Frontend app to diplay messages via Socket.io

Message Format
```
{
  message: <random text>,
  timestamp: <timestamp>,
  priority: <random number from 1-10>
}
```
## ARCHITECTURE & DESIGN
The project consists of three major modules/services:
- producer
- consumer
- frontend

### producer module
The producer module is based on NodeJs with Express framework. Express initializes the application as function which is passed to the HTTP server. The http server listens on port 3001. The `sender.js` file initializes the backend server along with creating connections with two major services :
- `RabbitMQ`
- `Socket.IO` 

#### RabbitMQ Service
The `sender.js` file establishes a new connection with the `RabbitMQ` service and creates new channel. Two queues are used in this application for messaging:
- `zegalDemo` : Stores all the messages generated by our `producer` or the `sender.js` file
- `zegalDemoFiltered` : Stores the messages filtered by our `consumer` or `receiver.js` for displaying in the front-end

The consume logic for the `zegalDemoFiltered` queue is also setup, after creating the rabbitMQ channel. This  event consumes the messages pushed to `zegalDemoFiltered` queue and emits `consumerResponse` event to the socket connection.

#### Socket.IO
The `sender.js` file also starts a socket connection based on the http server instance. On successful connection, a listener for `messageFromApp` is setup on the socket, which in turn invokes the `pushMessageToQueue` method. This method, starts publishing messages to the `zegalDemo` queue.

### consumer module
The consumer module, like the producer is based on NodeJs. It uses the `RabbitMQ` and `Socket.IO` connections to receive the queue messages and filter them by priority. Messages with priority greater than 7 are pushed to `zegalDemoFiltered` queue by the `receiver.js`

### frontend module
The frontend is a React app, used to display the messages received from the web socket. On loading the page, the frontend emits a `messageFromApp` socket message, which is handled by the `sender.js`. This socket message triggers the push message action the producer and the `receiver.js` filters and pushes the messages to new `zegalDemoFiltered` queue. The `sender.js` listens on this connection and finally emits `consumerResponse` socket message.
The `App.js` file is wrapped around with `socket.io` implementation to enable listening for `consumerResponse` message. On receiving, the message array is updated and listing of messages is displayed accordingly.

## SETUP
The three modules `producer`, `consumer` and `frontend` all require `npm install` to load required packages. The `RabbitMQ` service must be setup in the host machine, as it is the `message broker` used for this project along with `NodeJs`. The following are the major dependencies of the project:
```
- amplib
- socket.io
- express
- http
- lorem-ipsum
```




