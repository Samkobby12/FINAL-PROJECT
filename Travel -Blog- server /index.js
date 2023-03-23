const express = require("express");
const app = express();
const port = 3004;

const connection = require("./connection");

var cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/MyData", async function (req, res) {
  const result = await connection.getTravels(req.body);
  //   result.forEach(
  //     (r) => (r.location = [Math.random() * 50, Math.random() * 50])
  //   );
  res.json(result);
});
app.get("/MyData/:id", async function (req, res) {
  const id = req.params.id;
  const result = await connection.getTravelByID(id);
  //   result.location = [Math.random() * 50, Math.random() * 50];
  res.json(result);
});
app.post("/MyData", async function (req, res) {
  const result = await connection.addLocation(req.body);
  res.json(result);
});
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
