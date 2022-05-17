const express = require('express')
const connectDB = require('./config/db')

const app = express();

app.get('/', (req, res) => {
    res.json({mgs: 'Welcome to the Contact Keeper API'})
})

start();

async function start() {

    await connectDB()
    app.use(express.json({extended: false}))
    app.use('/api/users', require('./routes/users'))
    app.use('/api/auth', require('./routes/auth'))
    app.use('/api/contacts', require('./routes/contacts'))
    
    app.listen(5000, () => console.log('Server is listening on port 5000...'))
}