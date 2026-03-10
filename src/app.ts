import type { Request, Response, NextFunction } from "express";
import express from "express";
import newRouter from "./router/post/new.router.js";
import updateRouter from "./router/post/update.router.js";
import cors from "cors";

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  }),
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/post", newRouter);
app.use("/api/update", updateRouter);
app.use((req, res, next) => {
  const error = new Error("not found!") as CustomError;
  error.status = 404;
  next(error);
});

// error middleware
app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: "Something went wrong" });
  },
);

export default app;
