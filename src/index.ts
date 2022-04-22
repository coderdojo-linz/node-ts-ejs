import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

interface ICalculator {
  x: string;
  y: string;
}

app.get("/hobbies", (req, res) => {
  res.render("hobbies.ejs", { hobbies: ["sport", "reading"] });
});

app.get('/calc', (req, res) => {
  res.render("calc.ejs");
});

app.post('/calc-result', (req, res) => {
  let params = req.body as ICalculator;
  res.render("calc-result.ejs", { result: parseInt(params.x) + parseInt(params.y) });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
