const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const socketIo = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline';"
  );
  next();
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit("notification", {
    message: "New book recommendation available!",
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const profileRoutes = require("./routes/user");

app.use("/api/users", userRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
