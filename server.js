const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api');
const { MongoClient } = require('mongodb');

const http = require('http');

const app = express();
const PORT = process.env.PORT || 8000;
//hanna kcb8cXbzGAEzdGlJ
//mongodb+srv://hanna:<kcb8cXbzGAEzdGlJ>@useraccounts.bx3zc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//heroku => comp426finalhannalt

const url = "mongodb+srv://hanna:kcb8cXbzGAEzdGlJ@useraccounts.bx3zc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });

//const sockets = require('./routes/sockets');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_youtube', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
if (process.env.NODE_ENV === "production") {
    app.use(express.static('./client/build'))
}

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);

app.use(morgan('tiny'));
app.use('/api', routes);



app.listen(PORT, console.log(`Server is running on ${PORT}`))