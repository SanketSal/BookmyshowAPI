const express = require('express');
const routes = require('./routes');
const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
