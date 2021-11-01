const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const handlebars = require("express-handlebars");
const Contenedor = require("../contenedor");

app.use(express.json());
app.use(express.urlencoded(false));

app.set("views", "./views");
app.set("view engine", "hbs");

const c = new Contenedor();

app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "index",
  })
);

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
