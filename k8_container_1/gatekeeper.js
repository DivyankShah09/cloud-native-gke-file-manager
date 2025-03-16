const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const csv = require("csv-parser");
const path = require("path");

const app = express();
const port = 6000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());

app.post("/store-file", async (req, res) => {
  console.log("called");
  try {
    if (!fs.existsSync("/divyank_PV_dir")) {
      fs.mkdirSync("/divyank_PV_dir", { recursive: true });
    }
    const { file, data } = req.body;
    if (!file || !data) {
      console.log("****");
      return res.json({
        file,
        error: "Invalid JSON input.",
      });
    }

    const dataLines = data.split("\n");
    let writeStream = fs.createWriteStream(`/divyank_PV_dir/${file}`);
    for (const line of dataLines) {
      const trimmedLine = line.replace(" ", ""); // Remove leading and trailing whitespace
      writeStream.write(trimmedLine + "\n");
    }
    writeStream.end();
    return res.status(200).json({
      file,
      message: "Success.",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      file,
      error: "Error while storing the file to the storage.",
    });
  }
});

app.post("/calculate", async (req, res) => {
  try {
    const { file, product } = req.body;
    if (!file) {
      return res.status(400).json({ error: "Invalid JSON input.", file });
    }

    console.log(file);

    console.log(fileExists(file));

    if (!fileExists(file)) {
      return res.status(404).json({ file, error: "File not found." });
    }

    // const container2Url = `${process.env.CONTAINER2_URL}/calculate_product`;
    const container2Url = `http://localhost:3000/calculate_product`;
    console.log("container 2 URL : ", container2Url);
    const response = await axios.post(container2Url, { file, product });
    console.log("container 2 : ", response);
    return res.json(response.data);
  } catch (error) {
    console.log("error is here");
    console.error(error);
    return res.status(500).json({ error: error });
  }
});

function fileExists(file) {
  try {
    const filePath = `/divyank_PV_dir/${file}`;
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.listen(port, () => {
  console.log(`Container 1 listening at http://localhost:${port}`);
});
