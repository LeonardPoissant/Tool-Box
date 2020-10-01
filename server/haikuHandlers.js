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

  console.log("HAIKUDB", haikuDataBase);

  const haikuDataBaseName = haikuDataBase.haikuDataBaseName;

  const haikuString = haikuDataBase.haikuArray;
  let haikuArray = [];

  console.log("WITH .", haikuString);

  haikuArray.push(haikuString);

  console.log("POST DAT DB", haikuDataBaseName);
  const newValues = { $push: { haikuArray: haikuString } };

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

    /*if (createDB.insertedId !== undefined) {
      const updateDb = await db
        .collection("Haiku")
        .findOneAndUpdate({ _id: haikuDataBaseName }, newValues);
    }*/

    /* .bulkWrite(
        [
          {
            updateOne: {
              filter: { haikuDataBaseName: haikuDataBaseName },
              update: { $push: { haikuArray: haikuString } },
            },
          },
          {
            insertOne: {
              document: {
                haikuDataBaseName: haikuDataBaseName,
                haikuArray: haikuArray,
              },
            },
          },
          // { deleteOne: { filter: { haikuArray: haikuString } } },
        ],
        { ordered: false }
      );*/

    //.insertOne({
    //  haikuDataBaseName: haikuDataBaseName,
    // haikuArray: newValues,
    //});
    // .findOneAndUpdate({ haikuDataBaseName: haikuDataBaseName }, newValues);
    //.insertOne({ ...haikuDataBase });
    // .insertOne({ haikuDataBaseName: haikuDataBaseName, haikuArray });
    // .find({ dataBaseName: `${haikuDataBaseName}` })
    //.updateOne({ ...haikuDataBase });
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
  try {
    await client.connect();
    const db = client.db("test");
    const dataBaseArray = await db.collection("Haiku").find().toArray();

    console.log("dataBaseArray", dataBaseArray);

    const flattenedArray = [];
    const finalArray = [];
    dataBaseArray.forEach((haikuArray) => {
      haikuArray.haikuArray.forEach((array) => {
        flattenedArray.push(array);
      });
      flattenedArray.forEach((object) => {
        finalArray.push(Object.values(object));
      });
    });

    const flatfinalArray = finalArray.flat();

    console.log("FLAT", flattenedArray);

    console.log("FLAT", flatfinalArray);
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

    console.log("RANDOMHAIKU", randomHaiku);

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
