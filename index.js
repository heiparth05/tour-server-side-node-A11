const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

/* Middleware */
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y2kiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("lets_travel");
    const packageCollection = database.collection("packages");
    const resortCollection = database.collection("resorts");

    //GET API 01.1 packages
    app.get("/packages", async (req, res) => {
      const cursor = packageCollection.find({});
      const packages = await cursor.toArray();
      res.send(packages);
    });

    //GET API 01.2 resorts
    app.get("/resorts", async (req, res) => {
      const cursor = resortCollection.find({});
      const resorts = await cursor.toArray();
      res.send(resorts);
    });
  }

  finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Run my tour server!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

