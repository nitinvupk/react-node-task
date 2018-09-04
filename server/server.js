const app = require('./app');
const port = process.env.PORT || 8000;
const path = require('path');

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// Serve static files from the React app

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, function() {
  console.log("Your server is listening at port :: ",port);
});