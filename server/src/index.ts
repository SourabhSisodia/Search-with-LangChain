import "dotenv/config";
import express from "express";
import cors from "cors";
import {loadEnv} from "../utils/env"

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

  app.listen(port, () => {

    console.log(
      `server started on : ${port}`
    );

  });

};

setupAndStartServer();