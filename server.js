const http = require("http");
const app = require("./app"); // Import the Express app instance

// Get the port from environment variables or use 3000 as default
const port = process.env.PORT || 3000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Start listening on the specified port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
