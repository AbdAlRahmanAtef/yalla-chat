import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection");

  socket.on("join_room", async (data) => {
    socket.join(data);

    const messages = await Message.find({ socketId: data });
    socket.emit("receive_message", messages);
  });

  socket.on("send_message", async (data) => {
    await Message.create(data);

    const messages = await Message.find({ socketId: data.socketId });

    socket.to(data.socketId).emit("receive_message", messages);
  });

  socket.on("delete_message", async (data) => {
    await Message.findByIdAndRemove(data.id);
    const messages = await Message.find({ socketId: data.socketId });

    socket.to(data.socketId).emit("receive_message", messages);
  });

  socket.on("update_message", async (data) => {
    await Message.findByIdAndUpdate(data.id, { content: data.content });
    const messages = await Message.find({ socketId: data.socketId });
    socket.to(data.socketId).emit("receive_message", messages);
  });

  socket.on("disconnect", async () => {
    console.log("Disconnected");
  });
});

app.use("/auth", authRoute);
app.use("/users", usersRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL)
  .then(() =>
    server.listen(PORT, () => console.log("listening on port " + PORT))
  )
  .catch((e) => console.error(e));

const PORT = process.env.PORT || 5000;
