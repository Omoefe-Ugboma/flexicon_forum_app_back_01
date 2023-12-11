// Load environment variables
require('dotenv').config()

// Import express library
const express = require('express')

// Create an instance of express
const app = express()

// Import connect function from db/connect.js file
const connectDB = require('./db/connect')

const passport = require('passport');

// Define the port numnber for the server
const port = process.env.PORT || 3000

// Add the json middleware to allow the server parse the data
app.use(express.json())

// Import API Routes
app.use(passport.initialize())
const userRoutes = require('./routes/userRoutes')
const commRoutes = require('./routes/commRoutes')
const threadRoutes = require('./routes/threadRoutes')
const postRoutes = require('./routes/PostRoutes')
const replyRoutes = require('./routes/replyRoutes')
const { verifyUser } = require('./middleware/jwt')
const searchRoutes = require('./routes/searchRoutes')

// Using routes as middleware with prefix
// and verifying user where necessary

app.use('/api/users', userRoutes)
app.use('/api/communities', commRoutes)
app.use('/api/threads', threadRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/replies', replyRoutes)
app.use('/api/search', searchRoutes)

// Send a welcome message to the client
app.get('/', (req, res) => {
  res.status(200).send('Welcome to our Server')
})

// Define an async function to connect to the database and start
const start = async () => {
  try {
    // Connect to MongoDB database
    await connectDB(process.env.MONGO_URI)

    // Log a message to the console indicating that the server is up and running
    app.listen(port, () => {
      console.log(`Server is up and running in ${port}`)
    })
  } catch (error) {
    console.log(error) // Log any errors that occur during the connection process
  }
}

// Call the start function to start the server
start()
