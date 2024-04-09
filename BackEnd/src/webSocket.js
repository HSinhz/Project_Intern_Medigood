const {Server} = require("socket.io")
const {verifyJWT} = require('./middleware/jwtacction')
let io =null;
let dataShipper = '';
const initWebSocket = ( server) => {
    io = new Server (server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
          credentials: false
        }
    });
    io.on("connection", (socket) => {
        socket.on('required_token', (token) => {
            console.log('Accesstoken', token);
            const decoded = verifyJWT(token);
            console.log("Socket join room: ", decoded.ShopId)
            socket.join(decoded.ShopId);
            console.log(socket.rooms)
        })

        socket.on('shipper', (data) => {
            console.log("Received data shipper: ", data)
            setDataShipper(data);
        });
        
        socket.on('coordinates', (data) => {
            console.log("Received data coordinates: ", data)
        });
    });

    io.on('error', (error) => {
        console.error('WebSocket server error:', error);
    });
    return io;
}

const getSocketIo = () => {
    return io;
}

const setDataShipper = ( data) => {
    dataShipper = data
}

const getDataWSShipper = () => {
    return dataShipper;
}


module.exports = { initWebSocket, getSocketIo, getDataWSShipper } 