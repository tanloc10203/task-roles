import Express from "express";
import helmet from "helmet";
import morgan from "morgan";
import AppMiddleware from "./middleware/app.middleware";

const app = Express();

// middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// routes

// catch error 404
app.use(AppMiddleware.catchError404API);

// catch error server.
app.use(AppMiddleware.catchInterServerError);

export default app;
