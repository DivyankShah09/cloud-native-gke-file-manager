const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const csv = require("csv-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/calculate_product", (req, res) => {
  try {
    console.log("Container 2 called");
    const { file, product } = req.body;

    // Load the file into memory
    const filePath = `/divyank_PV_dir/${file}`;
    const rows = [];
    sum = 0;
    let isCSV = true;
    console.log(product);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Check if the row contains the expected keys
        if (!row.hasOwnProperty("product") || !row.hasOwnProperty("amount ")) {
          isCSV = false; // If any row does not have the expected keys, it's not CSV
        } else {
          console.log(row.product);
          if (row.product === product) {
            sum += parseFloat(row[Object.keys(row)[1]]) || 0;
          }
        }
      })
      .on("end", () => {
        if (isCSV && sum > 0) {
          console.log(`Total amount of ${product}:`, sum);
          res.json({ file, sum });
          console.log("File is in CSV format.");
        } else {
          res.json({ file: file, error: "Input file not in CSV format." });
        }
      });
  } catch (error) {
    console.error("this is error");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

app.listen(port, () => {
  console.log(`Container 2 listening on port: ${port}`);
});
