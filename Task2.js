const express = require("express");
const fs = require("fs");
const MongoClient = require("mongodb");
const app = express();
const port = 4000;

// Mongodb connection
const MONGO_URL = "mongodb://127.0.0.1";
const client = new MongoClient(MONGO_URL)
await client.connect();
console.log("Mongo is connected !!!");


const date_time = () => {
  const dateObject = new Date();
  // current date
  // adjust 0 before single digit date
  const date = `0 ${dateObject.getDate()}`.slice(-2);

  // current month
  const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);

  // current year
  const year = dateObject.getFullYear();

  // current hours
  const hours = dateObject.getHours();

  // current minutes
  const minutes = dateObject.getMinutes();

  // current seconds
  const seconds = dateObject.getSeconds();

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  // console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);

  // prints time in HH:MM format
  // console.log(`${hours}:${minutes}`);

  return `Date_${date}_${month}_${year}_Time_${hours}_${minutes}_${seconds}`;
};
app.get("/", function (req, res) {
  //coding for display timestamp
  try {
    //Create a file with content of timestamp
    const date_time = () => {
      const dateObject = new Date();
      // current date
      // adjust 0 before single digit date
      const date = `0 ${dateObject.getDate()}`.slice(-2);

      // current month
      const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);

      // current year
      const year = dateObject.getFullYear();

      // current hours
      const hours = dateObject.getHours();

      // current minutes
      const minutes = dateObject.getMinutes();

      // current seconds
      const seconds = dateObject.getSeconds();

      // prints date & time in YYYY-MM-DD HH:MM:SS format
      // console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);

      // prints time in HH:MM format
      // console.log(`${hours}:${minutes}`);

      return `Date_${date}_${month}_${year}_Time_${hours}_${minutes}_${seconds}`;
    };
    fs.writeFile(`./Timestamp/${date_time()}.txt`, date_time(), (err) => {
      console.log(err);
    });
    res.send({ message: "File created" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Write an api endpoint to retrieve all the files in that particulart folder
app.get("/show", function (req, res) {
  var arr = [];
  fs.readdir("./Content", (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    //List the files in the directory
    console.log("Files in the directory:");
    // Counter to keep track of the number of files read
    let filesRead = 0;
    files.forEach((file) => {
      fs.readFile(`./Content/${file}`, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading files:", err);
          return;
        }
        //Push the content into a array
        arr.push(data);
        // Increment the counter
        filesRead++;

        // Check if all files have been read
        if (filesRead === files.length) {
          // All files have been read, send the response
          res.send(arr);
        }
      });
    });
  });
});
app.listen(port, () => console.log(`the server started in: ${port} ✨ ✨`));
