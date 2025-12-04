import "dotenv/config";
import express from "express";
import cors from "cors";
import {loadEnv} from "./utils/env"
import { searchRouter } from "./routes/searchRoute";

loadEnv();

const port = Number(process.env.PORT ?? 5174);

const setupAndStartServer = async () => {

  const app = express();

  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN,
    })
  );

  app.use(express.json());
  app.use("/search" , searchRouter);

  app.listen(port, () => {

    console.log(
      `server started on : ${port}`
    );

  });

};

setupAndStartServer();