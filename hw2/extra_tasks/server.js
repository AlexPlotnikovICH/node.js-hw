import { createServer } from "http";
import logger from "./event_emitter_example.js";

const PORT = 3333;
const HOST = "127.0.0.1";

const server = createServer((req, res) => {
  if (req.url === "/hello") {
    logger.emit("info", `user made request on ${req.url}`);
    res.end("hello");
    return;
  } else if (req.url === "/warn") {
    logger.emit("warning", `warning on ${req.url}`);
    res.end("warning");
    return;
  }

  logger.emit("error", `error on ${req.url}`);
  res.end("404 not found");
});

server.listen(PORT, HOST, () => {
  console.log(`Server started at http://${HOST}:${PORT}`);
});
