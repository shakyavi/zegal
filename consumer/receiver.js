var amqp = require('amqplib/callback_api')
const express = require("express")
const socketIO = require('socket.io');
const http = require('http')

let server = http.createServer(express())
// let io = socketIO(server)
let io = socketIO(server,
    {cors:{origin:'*',methods:["GET","POST"]}}
)

//1. Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    console.log('Connecting to RabbitMQ...')
    if (connError) {
        throw connError
    }
//2. Create channel
    connection.createChannel((channelError, channel) => {
    console.log('Creating channel...')
        if (channelError) {
            throw channelError;
        }
        amqp.channel=channel
//3. Assert Queue : Check if queue is available or not, create if not
        channel.assertQueue('zegalDemo')
        channel.assertQueue('zegalDemoFiltered')
//4. Receive message from queue
        channel.consume('zegalDemo', (event)=>{
            console.log(`consuming 'zegalDemo' queue` )
            let data = JSON.parse(event.content.toString())
            console.log('received data',data)
            console.log('selecting messages with priority >=7')

            if(data.priority>=7){
                amqp.channel.sendToQueue('zegalDemoFiltered', Buffer.from(event.content.toString()))
            }

            // console.log(`emitting message ${data.message} of type consumerResponse to socketId- ${data.socketId}`)
            // io.to(data.socketId).emit('consumerResponse', data.message)

        },{noAck:true} )
    console.log('$$$ Consumer Ready...\n')
    })
})