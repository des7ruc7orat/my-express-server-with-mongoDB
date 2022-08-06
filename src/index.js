const express = require('express');
const cors = require('cors');
const routes = require('./routes');
//thats routes

const {auth} = require('./middlewares/authMiddleware')

const app = express();

// не знам дали да използвам това
app.use(express.json());
// както не знам дали да използвам това
app.use(express.json());
app.use(cors());

app.use(routes);
// app.use(auth)



const { initializeDatabase } = require('./config/database');



initializeDatabase()
.then(() =>{
    app.listen(3030, () => console.log(`App is listening on port 3030`));
})
