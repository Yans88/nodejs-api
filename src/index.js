import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import HttpStatus from "./responses/http-status.js";
import Response from "./responses/response.js";
import activityRoutes from "./routes/activityRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import logger from "./utils/loggerr.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/activity-groups", activityRoutes);
app.use("/todo-items", todoRoutes);

app.get("/", (req, res) => {
  res.send(
    new Response(
      HttpStatus.OK.status,
      "To Do List API, v1.0.0 - All Systems Go"
    )
  );
});

app.all("*", (req, res) =>
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.status,
        "Route does not exist on the server"
      )
    )
);

app.listen(PORT, () =>
  logger.info(`Server running on: ${ip.address()}:${PORT}`)
);
