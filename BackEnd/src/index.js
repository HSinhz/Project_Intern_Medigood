const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')
require("dotenv").config();
const corsConfig = require('cors');
const http = require('http');
const { initWebSocket} = require('./webSocket');
const app = express();
const port = 8080;
// configCors.configCors(app);
app.use(corsConfig({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Cho phép các phương thức GET, POST, PUT, DELETE
  allowedHeaders: ['Content-Type', 'Authorization'], // Cho phép các tiêu đề Content-Type và Authorization
  credentials: true // Cho phép gửi và nhận cookies cùng với yêu cầu
}));

app.use(express.static(path.join(__dirname, 'public')));
const routes = require( './routes/IndexRoute')

// kết nối với dtb ở đây
const db = require('./config/db/config');

// Connect to DB
db.connect();

// Xử lý dũ liệu từ form subbmit lên bằng phương thức POST
app.use(express.urlencoded(
  {
    extended: true
  }
));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
// Dùng để render ra view
app.set('views', path.join(__dirname, 'resources' , 'views'));
// Route init
// Web Socket 
const server = http.createServer(app);
initWebSocket(server);
routes(app);

server.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
}) 