const csv = require('csv-parser')
const fs = require('fs')
const { convertArrayToCSV } = require("convert-array-to-csv");
const header = ["country", "year", "population"];
var canada = "canada.txt";
var usa = "usa.txt";
var input_countries = 'input_countries.csv'
var readStream = fs.createReadStream(input_countries);
var writeCadStream = fs.createWriteStream(canada);
var writeUsaStream = fs.createWriteStream(usa);

// a. check if the canada and usa txt file exist
if (fs.existsSync(canada) || fs.existsSync(usa) ) {
    console.log("files exists... deleting the file");
    fs.unlinkSync(canada);
    fs.unlinkSync(usa);
  } else {
    console.log("creating the files...")
  }

// b. filter canada and write canada.txt
var cadFile = [];
readStream
  .pipe(csv())
  .on("data", (data) => {
    const content = {
      country: data.country,
      year: data.year,
      population: data.population,
    };
    if (data.country === "Canada") 
        cadFile.push(content);
  })
  .on("end", () => {
    const arrayToObj = convertArrayToCSV(cadFile, {
      header, separator: ","
    });

    writeCadStream.write(arrayToObj);
    console.log("-- Data read done from stream");
  });

// c. filter usa and write usa.txt
var usaFile = [];
readStream
  .pipe(csv())
  .on("data", (data) => {
    const content = {
      country: data.country,
      year: data.year,
      population: data.population,
    };
    if (data.country === "United States") 
        usaFile.push(content);
  })
  .on("end", () => {
    const convertArrayToObject = convertArrayToCSV(usaFile, {
      header, separator: ","
    });

    writeUsaStream.write(convertArrayToObject);
    console.log("-- Data read done from stream");
  });
