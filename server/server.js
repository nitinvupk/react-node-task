const app = require('./app');
const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log("Your server is listening at port :: ",port);
});
