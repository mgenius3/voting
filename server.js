const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
const { createTableUser } = require("./database/auth");
const { createTableBlog } = require("./database/blog");
const { createTableAutomobile } = require("./database/automobile");
const { createTableContact } = require("./database/contact");

// app.prepare().then(() => {
const server = express();

createTableUser();
createTableBlog();
createTableAutomobile();
createTableContact();

server.use(morgan("dev"));
// Middleware to parse JSON request body
// server.use(bodyParser.json());
// Default route handler
server.use(express.static(path.join(__dirname, "out")));
server.use("/styles", express.static(path.join(__dirname, "/styles")));
server.use(express.json({ limit: "10mb" }));
server.use("/serve/blog", require("./routes/blog"));
server.use("/serve/automobile", require("./routes/automobile"));
server.use("/serve/user", require("./routes/auth"));
server.use("/serve/admin", require("./routes/admin"));

// error handling
server.use(errorHandler);

// Middleware to handle requests that don't match any route
server.use(function (req, res) {
  res.status(404);

  // Render a custom error page
  res.json({
    title: "Page Not Found",
    message: "The requested page does not exist",
  });
});

// Error handler middleware
server.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500);

  // render a custom error page
  res.json({
    title: "Server Error",
    message: "Something went wrong on our end",
  });
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
