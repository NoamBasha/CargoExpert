import { userInputExample } from "./middlewares.js";

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import solutionRouter from "./routes/solutionRoutes.js";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 1337;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ extended: true, limit: "50mb" }));
// app.use(express.static(path.join(__dirname + "/public")));

app.get("/userInputExample", (req, res) => userInputExample(req, res));

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/solutions", solutionRouter);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
