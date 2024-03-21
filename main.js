const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
const URL = 3000;

app.use(express.json());
app.use(cors());



app.listen(URL, console.log(`Servidor conectado en puerto ${URL}`));

app.post("/canciones", (req, res)=>{
  const cancion = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  repertorio.push(cancion)
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio, null, 2));
  res.send("Cancion agregada con éxito");
})

app.get("/canciones", (req, res)=>{
  res.json(JSON.parse(fs.readFileSync("repertorio.json")));
})

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/web/index.html")
})

app.put("/canciones/:id", (req, res)=>{
  const {id} = req.params;
  const cancion = req.body;
  cancion.id = parseInt(cancion.id);
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = repertorio.findIndex((e)=>{
    return e.id === parseInt(id);
  })
  repertorio.splice(index, 1, cancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio, null, 2));
  res.send("Cancion modificada con éxito");
})

app.delete("/canciones/:id", (req, res)=>{
  const {id} = req.params;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = repertorio.findIndex((e)=>{
    return e.id === parseInt(id);
  })
  repertorio.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio, null, 2));
  res.send("Cancion eliminada con éxito");
})
