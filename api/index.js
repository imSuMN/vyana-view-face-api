require("dotenv").config();

const express = require("express");

const cors = require("cors");

const { s3Client } = require("../config");
const { ListObjectsV2Command } = require("@aws-sdk/client-s3");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Api Running...");
});

app.get("/viewImages/:eventId", async (req, res) => {

  const id = req.params.eventId;
  const input = {
    Bucket: process.env.BucketName,
    Delimiter : "/",
    Prefix : `${req.params.eventId}/`
  };
  const command = new ListObjectsV2Command(input);

  try {
    
    const resp = await s3Client.send(command);
     var contents = resp.Contents;
     var response = [];

     contents.map((item) =>{
      response.push(item.Key);
     })

    res.status(200).json({response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting photos" });
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
