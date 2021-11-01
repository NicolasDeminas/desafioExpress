const express = require("express");
const app = express();
const port = process.env.port || 8080;
const Contenedor = require("../contenedor");

app.use(express.json());
app.use(express.urlencoded(false));

const c = new Contenedor();

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("formulario_productos");
});

app.get("/productos", (req, res) => {
  c.getAll().then((data) => {
    res.render("productos", { data: data });
  });
});

app.post("/productos", (req, res) => {
  c.save(req.body).then((data) => {});
  res.render("formulario_productos");
});

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
