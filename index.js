const express = require('express');
const app = express();
const cors = require('cors');
require('./src/db/config');
const userRouter = require('./src/routes/userRoutes');
const noteRouters = require('./src/routes/notesRoutes');
app.use(cors());
app.use(express.json());

app.use((req, resp, next) => {
  console.log('HTTP method - ' + req.method + ', URl - ' + req.url);
  next();
});
app.use('/user', userRouter);
app.use('/note', noteRouters);

app.get('/', (req, resp) => {
  resp.send('hello world');
});

app.listen(5000, () => {
  console.log('Server start on the port number 5000');
});
