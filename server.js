const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env')});

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
});
mongoose.connection.on('error', (error) => {
    console.error(error.message());
});
mongoose.connection.on('connected', () => {
    console.log('Database connected Successfully.');
});

// Register all our Models here...
require('./models/User');

const app = require('./app');
// Light Up the Server!!
app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on PORT ---> ${process.env.APP_PORT}`);
});