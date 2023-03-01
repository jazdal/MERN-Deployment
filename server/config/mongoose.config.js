const mongoose = require('mongoose');

const database = "project_db";

mongoose.connect(`mongodb://127.0.0.1:27017/${database}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(() => console.log(`Connected to the database: ${database}`))
  .catch((err) => console.log(`Failed to connect to the database: ${database}`, err));