const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const dbPath = path.join(__dirname, "student.db");

const app = express();

app.use(express.json());
app.use(cors(
  origin:"http://localhost:3000",
  method:["GET"
,"POST"])
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(5000, () => {
      console.log("Server Running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`Dr Error:${e.message}`);
  }
};

initializeDBAndServer();

app.post("/Student/", async (request, response) => {
  const studentDetails = request.body;
  const {
    Name,
    StudentID,
    StudentYear,
    StudentCourse,
    Address,
    State,
  } = studentDetails;
  const createNewStudent = `INSERT INTO student (Name,StudentID,StudentYear,StudentCourse,Address,State)
  values(
    "${Name}","${StudentID}","${StudentYear}","${StudentCourse}","${Address}","${State}"
  );`;
  await db.run(createNewStudent);
  response.send("Student Successfully Added");
});

app.get("/student/", async (request, response) => {
  const getMovieName = `SELECT *  FROM student;`;
  const movieNameArray = await db.all(getMovieName);
  response.send(movieNameArray);
});

app.get("/student/:Name", async (request, response) => {
  const { Name } = request.params;
  console.log(Name);
  const matchDetailsQuery = `SELECT * FROM student WHERE StudentID = ${Name};`;
  const matchDetails = await db.get(matchDetailsQuery);
  response.send(matchDetails);
});

module.exports = app;
