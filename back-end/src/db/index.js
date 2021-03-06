const mongoose = require('mongoose');

const URI = process.env.MONGOOSE_URI;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).catch(error => console.log(error));

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('DB is connected');
});