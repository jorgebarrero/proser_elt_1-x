import express, { Application } from "express";
import morgan from "morgan";
const chalk = require("chalk");

// ROUTES
import IndexRoutes from "./routes/index.routes";
import PostRoutes from "./routes/post.routes";

import "./lib/env";
import errorReporter from "./lib/errors";

// console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);
// console.log(`Sample key is ${process.env.SAMPLE_KEY}`);
// errorReporter.report(new Error("example"));

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", this.port || process.env.DEFAULT_PORT_ONE || 3000);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(IndexRoutes);
    this.app.use("/posts", PostRoutes);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.clear();
    console.log(
      chalk.blue("**************************************************")
    );
    console.log("Server on port: " + this.app.get("port"));
    console.log(
      chalk.blue("**************************************************")
    );
  }
}
