var amqp = require('amqplib/callback_api')
const express = require("express")
const socketIO = require('socket.io');
const http = require('http')
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 10,
        min: 4
    }
});

let server = http.createServer(express())
// let io = socketIO(server)
let io = socketIO(server,
    {cors:{origin:'*',methods:["GET","POST"]}}
)

//1. Create Connection
console.log('Connecting to RabbitMQ...')
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError
    }
//2. Create channel
    connection.createChannel((channelError, channel) => {
        console.log('Creating channel...')

        if (channelError) {
            throw channelError;
        }
        amqp.channel = channel
//3. Assert Queue : Check if queue is available or not, create if not
        channel.assertQueue('zegalDemo')
        channel.assertQueue('zegalDemoFiltered')

        channel.consume("zegalDemoFiltered", (event) => {
            console.log(`consuming zegalDemoFiltered`)
            let resData = JSON.parse(event.content.toString())
            console.log('resData\n',resData)
            console.log(`Emitting 'consumerResponse' to socketId-> ${resData.socketId}` )
            io.to(resData.socketId).emit('consumerResponse', resData)}, {
            noAck: true
        })


    console.log('### Producer ready...\n')
    })
})

io.on('connection', (socket)=>{
    console.log(`on connection`)
    console.log(`New user connected ${socket.id}`)
    socket.on("messageFromApp", (connectionData) => {
        console.log('socket on messageFromApp')
        console.log('connectionData=',connectionData)
        let socketData = JSON.parse(connectionData)
        socketData.socketId = socket.id
        console.log('initiating pushing messages...')
       pushMessageToQueue(socketData)
    })
});

function pushMessageToQueue (data){
console.log('pushMessageToQueue')
    var sendMessage = true

    let executionTimeMS = 5000;

    setTimeout(() => {
        sendMessage = false
    }, executionTimeMS)

    var pushQueue = setInterval(function (counter) {
        return function () {

            if (sendMessage === false) {
                console.log('exiting...');
                clearInterval(pushQueue)
                return
            }

           ++counter
            let messageToQueue = lorem.generateSentences(1)
            let messagePriority = Math.floor(Math.random() * 10) + 1;
            let messageObject = {
                socketId : data.socketId,
                message: messageToQueue,
                priority: messagePriority,
                timestamp: new Date()

            }
            amqp.channel.sendToQueue('zegalDemo', Buffer.from(JSON.stringify(messageObject)))
            console.log(`Message '${messageToQueue}' sent to 'zegalDemo'`)

        };
    }(0), 50)
}

server.listen(3001)