import express from "express";
import ZenCache from "./cache";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
const cache = ZenCache.getInstance();

app.use(bodyParser.json());

/**
 * Route to get key/val from cache
 */
app.get("/:key", (req, res) => {
  const key = req.params.key;
  res.send(cache.get(key));
});

/**
 * Route to set key/val from cache
 */
app.post("/", (req, res) => {
  const { key, val } = req.body;
  cache.set(key, val);

  res.sendStatus(200);
});

/**
 * Route to delete key/val from cache
 */
app.delete("/:key", (req, res) => {
  const key = req.params.key;
  cache.delete(key);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
