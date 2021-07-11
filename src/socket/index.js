import MessagesController from '../controllers/MessagesController.js';

const Connection = (io) => {
  io.on('connection', socket => {
    console.log(`Socket conectado ${socket.id}`)

    //socket.emit('previousMessages', messages);
    //async () => {await console.log(MessagesController.index())}
    
      // .then((res) => {
      //   console.log(res)
      //   socket.emit('previousMessages', res)
      // })
      // .catch((err) => console.log(err))
    // socket.emit('previousMessages', () => {
    //   let data = [];
    //   app.get('/messages', (req, res) => {
    //     return client.query('SELECT * FROM messages', (err, result) => {
    //     if (err) {
    //       console.log('erro', err);
    //       return;
    //     }
    //     console.log('result', result )
    //     data = res.json(result.rows);
    //     })})
      
    //   console.log(data);
    //   return data;
    // })
    socket.on('sendMessage', async (data) => {
        //messages.push(data);
        // const obj = 
        //   {
        //     message: 'aaaaaaaaaa',
        //     author: 'eu'
        //   }
        console.log(data);
        socket.broadcast.emit('sendMessageBack', data);

        MessagesController.store({ data }, { status: 200, message: 'Message posted on database' });

        //setInterval(() => socket.emit('FromAPI', obj), 1000);
    });

    
});
}


export default Connection;
