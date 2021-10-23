import express from "express";
import Contenedor from "./contenedor.js";

const app = express();
const port = process.env.PORT || 8080;
const contenedor = new Contenedor();

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

app.get("/", (req, res) => {
  res.send(
    `<h1>Bienvenido</h1>\nIngrese en /productos para ver la lista completa de productos, o en /productosRandom para uno al azar`
  );
});

app.get("/productos", async (req, res) => {
  res.send(await contenedor.getAll());
});
app.get("/productosRandom", async (req, res) => {
  const array = await contenedor.getAll();
  const largoArray = Array.from(array);
  res.send(await contenedor.getById(getRandomInt(1, largoArray.length + 1)));
});

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
