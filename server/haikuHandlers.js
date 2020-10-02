const { forEach, random } = require("lodash");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.MONGO_URI;

// createHaikuDB creates a document in MongoDb where the array of haiku verses will be stored.

const createHaikuDB = async (req, res) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const haikuDataBase = req.body;
  const haikuDataBaseName = haikuDataBase.haikuDataBaseName;
  const haikuString = haikuDataBase.haikuArray;
  let haikuArray = [];
  haikuArray.push(haikuString);

  try {
    await client.connect();
    const db = client.db(haikuDataBaseName);
    const createDB = await db
      .collection("Haiku")
      .updateOne(
        { haikuDataBaseName: haikuDataBaseName },
        { $push: { haikuArray: haikuString } },
        { upsert: true }
      );
    client.close();
    res.status(201).json({
      status: 201,
      _id: haikuDataBaseName,
      haikuDataBase: haikuDataBase,
    });
  } catch (err) {
    res.status(500).json({
      data: haikuDataBaseName,
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }
};

const getAllHaikus = async (req, res) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db(id);
    const dataBaseArray = await db.collection("Haiku").find().toArray();

    const flattenedArray = [];
    dataBaseArray.forEach((haikuArray) => {
      haikuArray.haikuArray.forEach((array) => {
        flattenedArray.push(array);
      });
    });

    var n = 3;
    function shuffle(a) {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
    }
    array_tmp = flattenedArray.slice(0);
    shuffle(array_tmp);
    const randomHaiku = array_tmp.slice(0, n);

    res.status(201).json({
      status: 201,
      dataBaseArray: randomHaiku,
    });
  } catch (err) {
    res.status(500).json({
      data: randomHaiku,
      message: "Something went wrong",
      err,
    });
  }
};

module.exports = {
  createHaikuDB,
  getAllHaikus,
};
