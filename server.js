import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import router from "./server/routes/index";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send(" Welcome To Nanos");
});

app.use("*", (req, res) =>
  res.status(404).json({
    status: "404",
    message: "route not found"
  })
);

const  PORT  = 9000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;