const express = require("express");
const bodyParser = require('body-parser');
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const dbPath = path.join(__dirname, "student.db");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin:"*",
  method:["GET"
,"POST"],}));
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3005, () => {
      console.log("Server Running at http://localhost:3005");
    });
  } catch (e) {
    console.log(`Dr Error:${e.message}`);
  }
};

initializeDBAndServer();

app.post("/Student", async (request, response) => {
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




app.get('/student/:Name', async (request, response) => {
  const { Name } = request.params;
  const query = `SELECT * FROM Student WHERE Name LIKE '%${Name}%'`;
  try {
    const result = await db.all(query);
    response.json(result);
  } catch (err) {
    console.error('Error fetching data:', err);
    response.status(500).send('Internal Server Error');
    
  }
});

app.get('/student', async (request, response) => {
  
  const query = `SELECT * FROM Student`;
  try {
    const result = await db.all(query);
    response.json(result);
  } catch (err) {
    console.error('Error fetching data:', err);
    response.status(500).send('Internal Server Error');
    
  }
});

app.delete("/student/:StudentId/", async (request, response) => {
  const { StudentId } = request.params;
  const deleteBookQuery = `
    DELETE FROM
      student
    WHERE
      StudentID = ${StudentId};`;
  await db.run(deleteBookQuery);
  response.send("Book Deleted Successfully");
});


