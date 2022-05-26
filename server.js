require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//DB Connection
const connectDB = require('./config/db');
connectDB();

app.use(express.json());


// Routes 
app.use('/truck', require('./routes/create'));
app.use('/truck', require('./routes/load'));
app.use('/truck', require('./routes/unload'));
app.use('/info', require('./routes/info'));

//Route for invalid url
app.use((req, res, next) => {
  return res.json({ message: 'page not found!'});
});


app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error to fire up the server: ${err}`);
    return;
  }
  console.log(`Server is running on port : ${PORT}`);
});