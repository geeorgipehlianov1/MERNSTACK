// TODO change database name
const mongoose = require('mongoose')


const dbName = 'ContactKeeper'
const connectingString = `mongodb://localhost:27017/${dbName}`


module.exports = async (app) => {
    try {
        await mongoose.connect(connectingString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        console.log('Database connected');
    
        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        })
    } catch(err) {
        console.error('Error connecting to database');
        process.exit(1);
    }
}
